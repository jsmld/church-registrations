"use client";

import { useActionState } from "react";
import { registrationAction } from "../../action/registrationAction";
import {
  RegistrationsFormState,
  FieldsValueState,
} from "@/types/registrations.types";
import { UserIcon } from "@/components/icons";
import { Input } from "@/components/Input";

const initialFieldsState: FieldsValueState = {
  cpf: "",
  name: "",
  last_name: "",
  email: "",
  gender: "",
  marital_status: "",
  birth_date: "",
  phone: "",
  city: "",
  state: "",
  neighborhood: "",
  street: "",
  street_number: "",
  complement: "",
};

const initialFormState: RegistrationsFormState = {
  message: "",
  errors: {},
  values: { ...initialFieldsState },
};

export default function Page() {
  const [state, formAction, pending] = useActionState(
    registrationAction,
    initialFormState
  );

  return (
    <main className="registration-page">
      <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-2 text-center text-blue-600">
            Novo Cadastro
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Preencha os campos abaixo para criar sua conta.
          </p>

          <form action={formAction} className="registration-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Input
                id="cpf"
                label="CPF"
                type="text"
                icon={<UserIcon />}
                placeholder="000.000.000-00"
                state={state}
                pattern="\d{11}"
                requeired
                className="w-full"
              />
              <Input
                id="name"
                label="Nome"
                type="text"
                icon={<UserIcon />}
                placeholder="Pedro"
                state={state}
                pattern=""
                requeired
                className="w-full"
              />
              <Input
                id="last_name"
                label="Sobrenome"
                type="text"
                icon={<UserIcon />}
                placeholder="Santos"
                state={state}
                pattern=""
                requeired
                className="w-full"
              />
              <Input
                id="email"
                label="Email"
                type="text"
                icon={<UserIcon />}
                placeholder="email@example.com"
                state={state}
                pattern=""
                requeired
                className="w-full"
              />
              <Input
                id="gender"
                label="Genero"
                type="text"
                icon={<UserIcon />}
                placeholder="Feminino"
                state={state}
                pattern=""
                requeired
              />
              <Input
                id="marital_status"
                label="Estado Civil"
                type="text"
                icon={<UserIcon />}
                placeholder="Solteira"
                state={state}
                pattern=""
                requeired
              />
              <Input
                id="birth_date"
                label="Data de Nascimento"
                type="text"
                icon={<UserIcon />}
                placeholder="02/02/2000"
                state={state}
                pattern=""
                requeired
              />
              <Input
                id="phone"
                label="Telefone"
                type="text"
                icon={<UserIcon />}
                placeholder="(XX) XXXXX-XXXX"
                state={state}
                pattern=""
                requeired
              />
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                Endereço
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                <Input
                  id="city"
                  label="Cidade"
                  type="text"
                  icon={<UserIcon />}
                  placeholder="Salvador"
                  state={state}
                  pattern=""
                  requeired
                />
                <Input
                  id="state"
                  label="Estado"
                  type="text"
                  icon={<UserIcon />}
                  placeholder="BA"
                  state={state}
                  pattern=""
                  requeired
                />
                <Input
                  id="neighborhood"
                  label="Bairro"
                  type="text"
                  icon={<UserIcon />}
                  placeholder="Brotas"
                  state={state}
                  pattern=""
                  requeired
                />
                <Input
                  id="street"
                  label="Rua"
                  type="text"
                  icon={<UserIcon />}
                  placeholder="Dom Joao"
                  state={state}
                  pattern=""
                  requeired
                />
                <Input
                  id="street_number"
                  label="Número"
                  type="text"
                  icon={<UserIcon />}
                  placeholder="10"
                  state={state}
                  pattern=""
                  requeired
                />
                <Input
                  id="complement"
                  label="Complemento"
                  type="text"
                  icon={<UserIcon />}
                  placeholder="Apto 101"
                  state={state}
                  pattern=""
                  requeired
                />
              </div>
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
        </div>
      </div>
    </main>
  );
}
