import { z } from "zod";

export const subjectOptions = [
  "general",
  "support",
  "sales",
  "bug",
  "other",
] as const;

export const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "contact.errors.name.min" })
    .max(100, { message: "contact.errors.name.max" }),
  email: z.string()
    .email({ message: "contact.errors.email.invalid" }),
  subject: z.enum(subjectOptions, {
    message: "contact.errors.subject.required",
  }),
  message: z.string()
    .min(20, { message: "contact.errors.message.min" })
    .max(5000, { message: "contact.errors.message.max" }),
  newsletter: z.boolean().optional(),
  // Honeypot field for spam protection
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
