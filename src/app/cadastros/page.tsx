"use client";

import { useActionState } from "react";
import { registrationAction } from "./registrationAction";
import { RegistrationsState } from "@/types/registrations.types";

const initialState: RegistrationsState = {
  message: "",
  errors: {},
};

export default function Page() {
  const [state, formAction, pending] = useActionState(
    registrationAction,
    initialState
  );
  console.log(state);

  return (
    <main className="registration-page">
      <h1>Novo Cadastro</h1>
      <form action="">
        <div>
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" name="cpf" />
          {state.errors?.cpf && <p className="error">{state.errors.cpf}</p>}
        </div>
      </form>
      <form action={formAction}>
        <div>
          <label htmlFor="name">Nome Completo</label>
          <input type="text" id="name" name="name" />
          {state.errors?.name && <p className="error">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          {state.errors?.email && <p className="error">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="gender">Genero</label>
          <input type="text" id="gender" name="gender" />
          {state.errors?.gender && (
            <p className="error">{state.errors.gender}</p>
          )}
        </div>
        <div>
          <label htmlFor="marital_status">Estado Civil</label>
          <input type="text" id="marital_status" name="marital_status" />
          {state.errors?.marital_status && (
            <p className="error">{state.errors.marital_status}</p>
          )}
        </div>
        <div>
          <label htmlFor="birth_date">Data de Nascimento</label>
          <input type="date" id="birth_date" name="birth_date" />
          {state.errors?.birth_date && (
            <p className="error">{state.errors.birth_date}</p>
          )}
        </div>
        <div>
          <label htmlFor="age">Idade</label>
          <input type="number" id="age" name="age" />
          {state.errors?.age && <p className="error">{state.errors.age}</p>}
        </div>
        <div>
          <label htmlFor="phone">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(XX) XXXXX-XXXX"
          />
          {state.errors?.phone && <p className="error">{state.errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="city">Cidade</label>
          <input type="text" id="city" name="city" />
          {state.errors?.city && <p className="error">{state.errors.city}</p>}
        </div>
        <div>
          <label htmlFor="state">Estado</label>
          <input type="text" id="state" name="state" />
          {state.errors?.state && <p className="error">{state.errors.state}</p>}
        </div>
        <div>
          <label htmlFor="neighborhood">Bairro</label>
          <input type="text" id="neighborhood" name="neighborhood" />
          {state.errors?.neighborhood && (
            <p className="error">{state.errors.neighborhood}</p>
          )}
        </div>
        <div>
          <label htmlFor="street">Rua</label>
          <input type="text" id="street" name="street" />
          {state.errors?.street && (
            <p className="error">{state.errors.street}</p>
          )}
        </div>
        <div>
          <label htmlFor="street_number">Numero</label>
          <input type="text" id="street_number" name="street_number" />
          {state.errors?.street_number && (
            <p className="error">{state.errors.street_number}</p>
          )}
        </div>
        <div>
          <label htmlFor="complement">Complemento</label>
          <input type="text" id="complement" name="complement" />
          {state.errors?.complement && (
            <p className="error">{state.errors.complement}</p>
          )}
        </div>
        <button type="submit" aria-disabled={pending}>
          {pending ? "Enviando..." : "Cadastrar"}
        </button>
        {state.message && (
          <p
            className={
              state.errors && Object.keys(state.errors).length > 0
                ? "error"
                : "success"
            }
          >
            {state.message}
          </p>
        )}
      </form>
    </main>
  );
}
