const COOKIE_NAME = "admin_mfa_trusted";
const MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

function getSecret(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

async function hmacSign(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacVerify(data: string, signature: string): Promise<boolean> {
  const expected = await hmacSign(data);
  if (expected.length !== signature.length) return false;
  // Constant-time comparison
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createTrustedDeviceCookie(userId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + MAX_AGE;
  const hmac = await hmacSign(`${userId}:${expiresAt}`);
  const value = `${userId}:${expiresAt}:${hmac}`;

  return {
    name: COOKIE_NAME,
    value,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: MAX_AGE,
    },
  };
}

export async function validateTrustedDevice(
  cookieValue: string | undefined,
  userId: string
): Promise<boolean> {
  if (!cookieValue) return false;

  const parts = cookieValue.split(":");
  if (parts.length !== 3) return false;

  const [cookieUserId, expiresAtStr, hmac] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);

  // Check userId matches
  if (cookieUserId !== userId) return false;

  // Check not expired
  if (isNaN(expiresAt) || Math.floor(Date.now() / 1000) > expiresAt)
    return false;

  // Verify HMAC
  return hmacVerify(`${userId}:${expiresAt}`, hmac);
}

export { COOKIE_NAME as TRUSTED_DEVICE_COOKIE_NAME };
