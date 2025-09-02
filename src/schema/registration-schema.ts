import { z } from "zod";

const gender = ["masculino", "feminino"];

const maritalStatus = [
  "solteiro",
  "casado",
  "divorciado",
  "viuvo",
  "uniao_estavel",
];

const fieldErrors = {
  required: (field: string) => `${field} é obrigatório.`,
  min: (field: string, min: number) =>
    `${field} deve ter no mínimo ${min} caracteres.`,
  max: (field: string, max: number) =>
    `${field} deve ter no máximo ${max} caracteres.`,
};

export const cepFormSchema = z
  .string()
  .length(8, { message: "CEP deve ter 8 caracteres." })
  .regex(/^\d+$/, {
    message: "CEP deve conter apenas números.",
  });

export const FormSchema = z.object({
  cpf: z
    .string()
    .length(11, { message: "CPF deve ter 11 caracteres." })
    .regex(/^\d+$/, { message: "CPF deve conter apenas números." }),

  name: z.string().min(3, fieldErrors.min("Nome", 3)),

  last_name: z.string().min(3, fieldErrors.min("Sobrenome", 3)),

  email: z.email({ message: "Formato de email inválido." }),

  gender: z.enum(gender, { message: "Gênero inválido." }),

  marital_status: z.enum(maritalStatus, { message: "Estado civil inválido." }),

  birth_date: z.string().min(1, fieldErrors.required("Data de Nascimento")),

  phone: z
    .string()
    .min(10, fieldErrors.min("Telefone", 10))
    .max(15, fieldErrors.max("Telefone", 15)),

  cep: cepFormSchema,

  city: z.string().min(1, fieldErrors.required("Cidade")),

  state: z.string().min(1, fieldErrors.required("Estado")),

  neighborhood: z.string().min(1, fieldErrors.required("Bairro")),

  street: z.string().min(1, fieldErrors.required("Rua")),

  street_number: z.string().min(1, fieldErrors.required("Número da Rua")),

  complement: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
