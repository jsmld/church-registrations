"use client";

import { useActionState, useState, useEffect } from "react";
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
  const [stateForm, formAction, pending] = useActionState(
    registrationAction,
    initialFormState
  );
  const [values, setValues] = useState<FieldsValueState>(initialFieldsState);
  const [cepAddressFetched, setCepAddressFetched] = useState(false);

  useEffect(() => {
    // Sincroniza o estado local com o estado retornado pela action,
    // útil para repopular o formulário após um erro de validação no servidor.
    if (stateForm.values) {
      setValues(stateForm.values);
    }
  }, [stateForm.values]);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    setValues((prev) => ({ ...prev, cep }));

    if (cep.length !== 8) {
      setCepAddressFetched(false);
      return;
    }

    const cepValidationResult = cepFormSchema.safeParse(cep);

    if (cepValidationResult.success) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setValues((prev) => ({
            ...prev,
            city: data.localidade,
            state: data.uf,
            neighborhood: data.bairro,
            street: data.logradouro,
          }));
          setCepAddressFetched(true);
        } else {
          console.error("CEP não encontrado.");
          setValues((prev) => ({
            ...prev,
            city: "",
            state: "",
            neighborhood: "",
            street: "",
          }));
          setCepAddressFetched(false);
        }
      } catch (error) {
        console.error("Falha ao buscar CEP:", error);
      }
    } else {
      setCepAddressFetched(false);
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
                value={values.cpf}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, cpf: e.target.value }))
                }
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
                value={values.name}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, name: e.target.value }))
                }
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
                value={values.last_name}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, last_name: e.target.value }))
                }
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
                value={values.email}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, email: e.target.value }))
                }
                error={stateForm.errors?.email}
              />
              <Select
                id="gender"
                label="Gênero"
                options={genderOptions}
                required
                value={values.gender}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, gender: e.target.value }))
                }
                error={stateForm.errors?.gender}
              />
              <Select
                id="marital_status"
                label="Estado Civil"
                options={maritalStatusOptions}
                required
                value={values.marital_status}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    marital_status: e.target.value,
                  }))
                }
                error={stateForm.errors?.marital_status}
              />
              <Input
                id="birth_date"
                label="Data de Nascimento"
                type="date"
                required
                value={values.birth_date}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, birth_date: e.target.value }))
                }
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
                value={values.phone}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, phone: e.target.value }))
                }
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
                  value={values.cep}
                  error={stateForm.errors?.cep}
                  onChange={handleCepChange}
                  wrapperClassName="lg:col-span-2"
                />
                <Input
                  id="city"
                  label="Cidade"
                  type="text"
                  placeholder="Salvador"
                  required
                  value={values.city}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, city: e.target.value }))
                  }
                  error={stateForm.errors?.city}
                  readOnly={cepAddressFetched}
                />
                <Input
                  id="state"
                  label="Estado"
                  type="text"
                  placeholder="BA"
                  required
                  value={values.state}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, state: e.target.value }))
                  }
                  error={stateForm.errors?.state}
                  readOnly={cepAddressFetched}
                />
                <Input
                  id="neighborhood"
                  label="Bairro"
                  type="text"
                  placeholder="Brotas"
                  required
                  value={values.neighborhood}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      neighborhood: e.target.value,
                    }))
                  }
                  error={stateForm.errors?.neighborhood}
                  readOnly={cepAddressFetched}
                  wrapperClassName="lg:col-span-2"
                />
                <Input
                  id="street"
                  label="Rua"
                  type="text"
                  placeholder="Dom Joao"
                  required
                  value={values.street}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, street: e.target.value }))
                  }
                  error={stateForm.errors?.street}
                  readOnly={cepAddressFetched}
                  wrapperClassName="lg:col-span-2"
                />
                <Input
                  id="street_number"
                  label="Número"
                  type="text"
                  placeholder="10"
                  required
                  value={values.street_number}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      street_number: e.target.value,
                    }))
                  }
                  error={stateForm.errors?.street_number}
                />
                <Input
                  id="complement"
                  label="Complemento"
                  type="text"
                  placeholder="Apto 101"
                  value={values.complement}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      complement: e.target.value,
                    }))
                  }
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
