"use client";

import { useActionState, useState } from "react";
import { cpfValidateAction } from "../action/cpfValidatorAction";
import { cpfValidationState } from "@/types/registrations.types";
import { z } from "zod";

const cpfSchema = z
  .string()
  .length(11, { message: "CPF deve ter 11 caracteres." });

const initialCpfValidationState: cpfValidationState = {
  message: "",
  errors: {},
};

export function CPFField() {
  const [errors, setErrors] = useState<cpfValidationState | null>(
    initialCpfValidationState
  );
  const [cpfState, cpfAction, pending] = useActionState(
    cpfValidateAction,
    initialCpfValidationState
  );

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const value = event.target.value;
    const validation = cpfSchema.safeParse(value);

    if (!validation.success) {
      const treeError = z.treeifyError(validation.error);

      setErrors({
        message: "Erro de validação.",
        errors: {
          cpf: treeError.errors[0] ?? "",
        },
      });
    }
  };
  return (
    <div>
      <div>
        <label htmlFor="cpf">CPF</label>
        <input type="text" id="cpf" name="cpf" onChange={handlerChange} />
        {(cpfState.errors?.cpf || errors?.errors?.cpf) && (
          <p className="error">{cpfState.errors?.cpf || errors?.errors?.cpf}</p>
        )}
      </div>
      <button type="submit" formAction={cpfAction} disabled={pending}>
        {pending ? "Validando..." : "Proxeguir"}
      </button>
      {cpfState.message && cpfState.message !== "CPF válido." && (
        <p className="error">{cpfState.message}</p>
      )}
    </div>
  );
}
