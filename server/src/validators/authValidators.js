import {z} from "zod";

export const registerSchema = z.object({
    pseudo: z.string().min(3, "Le pseudo doit contenir au moins 3 caractères."),
    email: z.string().email("L'email n'est pas valide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
    avatar: z.string().url("L'URL de l'avatar n'est pas valide.").optional(),
    description: z.string().max(255, "La description ne doit pas dépasser 255 caractères.").optional(),
});

export const loginSchema = z.object({
    email: z.string().email("L'email est invalide."),
    password: z.string().min(6, "Le mot de passe est trop court."),
});