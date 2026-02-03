import { z } from "zod";

export const subjectOptions = [
  "general",
  "support",
  "sales",
  "bug",
  "other",
] as const;

// Type for the contact form data
export type ContactFormData = {
  name: string;
  email: string;
  subject: typeof subjectOptions[number];
  message: string;
  newsletter?: boolean;
  website?: string;
};

// Factory function that creates a schema with translated error messages
export function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z.string()
      .min(2, { message: t("contact.errors.name.min") })
      .max(100, { message: t("contact.errors.name.max") }),
    email: z.string()
      .email({ message: t("contact.errors.email.invalid") }),
    subject: z.enum(subjectOptions, {
      message: t("contact.errors.subject.required"),
    }),
    message: z.string()
      .min(20, { message: t("contact.errors.message.min") })
      .max(5000, { message: t("contact.errors.message.max") }),
    newsletter: z.boolean().optional(),
    // Honeypot field for spam protection
    website: z.string().optional(),
  });
}
