"use client";

import { useActionState, useState } from "react";
import { registrationAction } from "../../action/registrationAction";
import {
  RegistrationsFormState,
  FieldsValueState,
} from "@/types/registrations.types";
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon } from "@/components/icons";
import { Input, Select } from "@/components/form";
import { cepFormSchema } from "@/schema/registration-schema";

export const initialFieldsState: FieldsValueState = {
  cpf: "",
  name: "",
  last_name: "",
  email: "",
  gender: "",
  marital_status: "",
  birth_date: "",
  phone: "",
  cep: "",
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

const genderOptions = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
];

const maritalStatusOptions = [
  { value: "solteiro", label: "Solteiro(a)" },
  { value: "casado", label: "Casado(a)" },
  { value: "divorciado", label: "Divorciado(a)" },
  { value: "viuvo", label: "Viúvo(a)" },
  { value: "uniao_estavel", label: "União Estável" },
];

export default function Page() {
  const [cityField, setCityField] = useState("");
  const [stateField, setStateField] = useState("");
  const [neighborhoodField, setNeighborhoodField] = useState("");
  const [streetField, setStreetField] = useState("");
  const [cepValidation, setCepValidation] = useState(false);
  const [stateForm, formAction, pending] = useActionState(
    registrationAction,
    initialFormState
  );

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    const cepValidation = cepFormSchema.safeParse(cep);

    if (cepValidation.success) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setCityField(data.localidade);
          setStateField(data.uf);
          setNeighborhoodField(data.bairro);
          setStreetField(data.logradouro);
          setCepValidation(true);
        } else {
          console.error("CEP não encontrado.");
          setCityField("");
          setStateField("");
          setNeighborhoodField("");
          setStreetField("");
          setCepValidation(false);
        }
      } catch (error) {
        console.error("Falha ao buscar CEP:", error);
      }
    } else {
      console.log("error cep", cep);
    }
  };

  return (
    <main className="registration-page">
      <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-2 text-center text-primary">
            Novo Cadastro
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Preencha os campos abaixo para se cadastrar.
          </p>

          <form action={formAction} className="registration-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Input
                id="cpf"
                label="CPF"
                type="text"
                icon={<UserIcon />}
                placeholder="000.000.000-00"
                pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                maxLength={14}
                required
                defaultValue={stateForm.values?.cpf}
                error={stateForm.errors?.cpf}
              />
              <Input
                id="name"
                label="Nome"
                type="text"
                icon={<UserIcon />}
                placeholder="Pedro"
                required
                minLength={3}
                pattern="^[a-zA-Z]+$"
                defaultValue={stateForm.values?.name}
                error={stateForm.errors?.name}
                messageVallidator="Nome deve ter no mínimo 3 caracteres"
              />
              <Input
                id="last_name"
                label="Sobrenome"
                type="text"
                icon={<UserIcon />}
                placeholder="Santos"
                required
                minLength={3}
                pattern="^[a-zA-Z]+$"
                defaultValue={stateForm.values?.last_name}
                error={stateForm.errors?.last_name}
                messageVallidator="Sobrenome deve ter no mínimo 3 caracteres"
              />
              <Input
                id="email"
                label="Email"
                type="email"
                icon={<MailIcon />}
                placeholder="email@example.com"
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                defaultValue={stateForm.values?.email}
                error={stateForm.errors?.email}
              />
              <Select
                id="gender"
                label="Gênero"
                options={genderOptions}
                required
                defaultValue={stateForm.values?.gender}
                error={stateForm.errors?.gender}
              />
              <Select
                id="marital_status"
                label="Estado Civil"
                options={maritalStatusOptions}
                required
                defaultValue={stateForm.values?.marital_status}
                error={stateForm.errors?.marital_status}
              />
              <Input
                id="birth_date"
                label="Data de Nascimento"
                type="date"
                required
                defaultValue={stateForm.values?.birth_date}
                error={stateForm.errors?.birth_date}
              />
              <Input
                id="phone"
                label="Telefone"
                type="number"
                icon={<PhoneIcon />}
                placeholder="(XX) XXXXX-XXXX"
                required
                pattern="\(\d{2}\) \d{5}-\d{4}"
                defaultValue={stateForm.values?.phone}
                error={stateForm.errors?.phone}
              />
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Endereço
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
                <Input
                  id="cep"
                  label="CEP"
                  type="text"
                  icon={<MapPinIcon />}
                  placeholder="00000000"
                  pattern="\d{8}"
                  maxLength={8}
                  required
                  defaultValue={stateForm.values?.cep}
                  error={stateForm.errors?.cep}
                  onChange={handleCepChange}
                  disabled={cepValidation}
                  wrapperClassName="lg:col-span-2"
                />
                <Input
                  id="city"
                  label="Cidade"
                  type="text"
                  placeholder="Salvador"
                  required
                  defaultValue={stateForm.values?.city || cityField}
                  error={stateForm.errors?.city}
                  disabled={cepValidation}
                />
                <Input
                  id="state"
                  label="Estado"
                  type="text"
                  placeholder="BA"
                  required
                  defaultValue={stateForm.values?.state || stateField}
                  error={stateForm.errors?.state}
                  disabled={cepValidation}
                />
                <Input
                  id="neighborhood"
                  label="Bairro"
                  type="text"
                  placeholder="Brotas"
                  required
                  defaultValue={
                    stateForm.values?.neighborhood || neighborhoodField
                  }
                  error={stateForm.errors?.neighborhood}
                  disabled={cepValidation}
                  wrapperClassName="lg:col-span-2"
                />
                <Input
                  id="street"
                  label="Rua"
                  type="text"
                  placeholder="Dom Joao"
                  required
                  defaultValue={stateForm.values?.street || streetField}
                  error={stateForm.errors?.street}
                  wrapperClassName="lg:col-span-2"
                />
                <Input
                  id="street_number"
                  label="Número"
                  type="text"
                  placeholder="10"
                  required
                  defaultValue={stateForm.values?.street_number}
                  error={stateForm.errors?.street_number}
                />
                <Input
                  id="complement"
                  label="Complemento"
                  type="text"
                  placeholder="Apto 101"
                  defaultValue={stateForm.values?.complement}
                  error={stateForm.errors?.complement}
                  wrapperClassName="lg:col-span-full"
                />
              </div>
            </div>

            <button
              className="btn btn-primary w-full"
              type="submit"
              aria-disabled={pending}
            >
              {pending ? "Enviando..." : "Cadastrar"}
            </button>
            {stateForm.message && (
              <p
                className={
                  stateForm.errors && Object.keys(stateForm.errors).length > 0
                    ? "error"
                    : "success"
                }
              >
                {stateForm.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
