import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Configuration for fallback behavior
const FALLBACK_EMAIL = process.env.FALLBACK_EMAIL || "support@jotatech.org";

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 3;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    // Reset window
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Check if the error is related to domain verification
 * Resend returns 403 status code when the domain is not verified
 */
function isDomainVerificationError(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    const err = error as { statusCode?: number; message?: string };
    // Check for 403 status code or specific error messages
    if (err.statusCode === 403) return true;
    if (err.message?.toLowerCase().includes("domain")) return true;
    if (err.message?.toLowerCase().includes("verified")) return true;
    if (err.message?.toLowerCase().includes("not authorized")) return true;
  }
  return false;
}

/**
 * Log contact form submission for manual follow-up when email service fails
 */
async function logContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  newsletter?: boolean;
}): Promise<void> {
  // Log to console for server-side monitoring
  console.log("[Contact Form Submission]", {
    timestamp: new Date().toISOString(),
    ...data,
  });

  // In a production environment, you might want to:
  // 1. Store in a database for manual review
  // 2. Send to a Slack webhook
  // 3. Create a ticket in a support system
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "rate_limit_exceeded" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, newsletter, website } = body;

    // Honeypot check - if website field is filled, it's likely spam
    if (website && website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "missing_fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "invalid_email" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 20 || message.length > 5000) {
      return NextResponse.json(
        { error: "invalid_message_length" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!resend) {
      // Log the submission for manual processing
      await logContactSubmission({ name, email, subject, message, newsletter });
      
      return NextResponse.json(
        { 
          error: "email_service_unavailable",
          message: "Email service is temporarily unavailable. Your message has been logged and we will contact you at the email you provided.",
          fallback: true
        },
        { status: 503 }
      );
    }

    const subjectLabels: Record<string, string> = {
      general: "Consulta general",
      support: "Soporte técnico",
      sales: "Ventas",
      bug: "Reporte de bug",
      other: "Otro",
    };

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "SmartSpend Contact <contact@jotatech.org>",
      to: [FALLBACK_EMAIL],
      replyTo: email,
      subject: `[${subjectLabels[subject] || subject}] Mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subjectLabels[subject] || subject}</p>
        <p><strong>Suscrito al newsletter:</strong> ${newsletter ? "Sí" : "No"}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      // Check if this is a domain verification error
      if (isDomainVerificationError(error)) {
        // Log the submission for manual processing
        await logContactSubmission({ name, email, subject, message, newsletter });

        return NextResponse.json(
          { 
            error: "domain_not_verified",
            message: "Our email service is being configured. Your message has been logged and we will contact you at the email you provided.",
            fallback: true,
            details: "The domain jotatech.org needs to be verified at https://resend.com/domains"
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: "email_send_failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint to verify email service status
 */
export async function GET() {
  if (!resend) {
    return NextResponse.json(
      { status: "unconfigured", message: "Email service not configured" },
      { status: 503 }
    );
  }

  try {
    // Try to get account info to verify API key is valid
    void await resend.apiKeys.list();
    return NextResponse.json(
      { status: "healthy", message: "Email service is available" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend health check failed:", error);
    return NextResponse.json(
      { status: "unhealthy", message: "Email service is unavailable" },
      { status: 503 }
    );
  }
}
