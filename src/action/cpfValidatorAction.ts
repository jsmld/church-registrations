"use server";
import { z } from "zod";
import { cpfValidationState } from "@/types/registrations.types";

const cpfSchema = z
  .string()
  .length(11, { message: "CPF deve ter 11 caracteres." });

export async function cpfValidateAction(
  prevState: cpfValidationState,
  formData: FormData
): Promise<cpfValidationState> {
  const cpf = formData.get("cpf");
  const validation = cpfSchema.safeParse(cpf);

  if (!validation.success) {
    return {
      message: "Erro de validação.",
      errors: { cpf: validation.error.flatten().fieldErrors },
    };
  }

  const validatedCpf = validation.data;
  const token = process.env.CPF_CNPJ_API_TOKEN;
  const apiPackage = 1;

  try {
    const response = await fetch(
      `https://api.cpfcnpj.com.br/${token}/${apiPackage}/${validatedCpf}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          message: "CPF não encontrado.",
          errors: { cpf: "CPF não encontrado na base de dados externa." },
        };
      }
      const errorData = await response.json().catch(() => null);
      console.error("Erro da API CPF/CNPJ:", errorData);
      return {
        message: "Erro ao consultar CPF.",
        errors: {
          cpf:
            errorData?.message || "Serviço de validação de CPF indisponível.",
        },
      };
    }

    const data = await response.json();

    if (data.status === "ERRO") {
      return {
        message: "CPF inválido.",
        errors: { cpf: data.message || "CPF inválido." },
      };
    }

    // Assuming the API returns a `nome` field on success
    return {
      message: "CPF válido.",
      errors: {},
    };
  } catch (error) {
    console.error("Falha ao buscar dados do CPF:", error);
    return {
      message: "Erro de comunicação com o serviço de CPF.",
      errors: { cpf: "Não foi possível validar o CPF neste momento." },
    };
  }
}
