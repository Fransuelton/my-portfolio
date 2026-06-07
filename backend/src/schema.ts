import { z } from "zod";

export const contactSchema = z.object({
  name:      z.string().min(2, "Nome muito curto").max(100, "Nome muito longo")
              .regex(/^[\p{L}\s'-]+$/u, "Nome inválido"),
  email:     z.string().email("E-mail inválido").max(255, "E-mail muito longo"),
  message:   z.string().min(10, "Mensagem muito curta").max(1000, "Mensagem muito longa"),
  bot_field: z.string().max(0, "Bot detectado"),
});

export type ContactInput = z.infer<typeof contactSchema>;
