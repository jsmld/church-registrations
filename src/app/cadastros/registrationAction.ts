"use server";

import { z } from "zod";
import { RegistrationsState } from "@/types/registrations.types";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const FormSchema = z.object({
  cpf: z.string().length(11, { message: "CPF deve ter 11 caracteres." }),
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres." }),
  email: z.email({ message: "Formato de email inválido." }),
  gender: z.string().min(1, { message: "Gênero é obrigatório." }),
  marital_status: z.string().min(1, { message: "Estado civil é obrigatório." }),
  birth_date: z
    .string()
    .min(1, { message: "Data de nascimento é obrigatória." }),
  age: z.coerce.number({ message: "Idade deve ser um número." }),
  phone: z
    .string()
    .max(15, { message: "Telefone deve ter no mínimo 15 caracteres." }),
  city: z.string().min(1, { message: "Cidade é obrigatória." }),
  state: z.string().min(1, { message: "Estado é obrigatório." }),
  neighborhood: z.string().min(1, { message: "Bairro é obrigatório." }),
  street: z.string().min(1, { message: "Rua é obrigatória." }),
  street_number: z.string().min(1, { message: "Número é obrigatório." }),
  complement: z.string().optional(),
});

export async function registrationAction(
  prevState: RegistrationsState,
  formData: FormData
): Promise<RegistrationsState> {
  const validatedFields = FormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: "Erro de validação. Por favor, verifique os campos.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    cpf,
    name,
    email,
    gender,
    marital_status,
    birth_date,
    age,
    phone,
    city,
    state,
    neighborhood,
    street,
    street_number,
    complement,
  } = validatedFields.data;

  /* try {
    await pool.query(
      `INSERT INTO users (cpf, name, email, gender, marital_status, birth_date, age, phone, city, state, neighborhood, street, street_number, complement)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        cpf,
        name,
        email,
        gender,
        marital_status,
        birth_date,
        age,
        phone,
        city,
        state,
        neighborhood,
        street,
        street_number,
        complement,
      ]
    );
    return { message: "Cadastro realizado com sucesso!", errors: {} };
  } catch (error: any) {
    console.error("Error during signup:", error);
    if (error.code === "23505") {
      return {
        message: "Erro: CPF já cadastrado.",
        errors: {
          cpf: ["Este CPF já está em uso."],
        },
      };
    }
    return {
      message: "Erro no servidor ao tentar realizar o cadastro.",
      errors: {},
    };
  } */
}
