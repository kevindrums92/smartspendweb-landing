import { z } from "zod";

export const giftSubscriptionSchema = z.object({
  userId: z.string().min(1, "ID de usuario requerido"),
  duration: z.enum(["monthly", "annual", "lifetime"], {
    message: "Selecciona una duracion",
  }),
});

export type GiftSubscriptionInput = z.infer<typeof giftSubscriptionSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export type LoginInput = z.infer<typeof loginSchema>;
