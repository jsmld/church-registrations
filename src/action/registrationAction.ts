"use server";

import { z } from "zod";
import { FormSchema } from "@/schema/registration-schema";
import {
  RegistrationsFormState,
  FieldsValueState,
} from "@/types/registrations.types";
import pool from "@/services/db/pool";

export async function registrationAction(
  prevState: RegistrationsFormState,
  formData: FormData
): Promise<RegistrationsFormState> {
  const formEntries = formData.entries().filter(([key]) => !key.includes("$"));
  const formJsonEntries = Object.fromEntries(formEntries) as FieldsValueState;
  const validatedFields = FormSchema.safeParse(formJsonEntries);
  console.log(formJsonEntries);

  if (!validatedFields.success) {
    const treeErro = z.treeifyError(validatedFields.error);
    const fieldErrors = Object.fromEntries(
      Object.entries(treeErro.properties ?? {}).map(([key, value]) => [
        key,
        value.errors[0] || "",
      ])
    );

    return {
      message: "Erro de validação. Por favor, verifique os campos.",
      errors: fieldErrors,
      values: { ...formJsonEntries },
    };
  }

  const {
    cpf,
    name,
    last_name,
    email,
    gender,
    marital_status,
    birth_date,
    phone,
    city,
    state,
    neighborhood,
    street,
    street_number,
    complement,
  } = validatedFields.data;

  try {
    await pool.query(
      `INSERT INTO participants (cpf, name, last_name, email, gender, marital_status, birth_date, phone, city, state, neighborhood, street, street_number, complement)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        cpf,
        name,
        last_name,
        email,
        gender,
        marital_status,
        birth_date,
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
          cpf: "Este CPF já está em uso.",
        },
      };
    }

    return {
      message: "Erro no servidor ao tentar realizar o cadastro.",
      errors: {},
    };
  }
}
