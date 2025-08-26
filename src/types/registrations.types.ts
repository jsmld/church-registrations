import { FormSchemaType } from "@/schema/registration-schema";

export type FieldsValueState = FormSchemaType;

export type FieldsName = keyof FieldsValueState;

export type RegistrationsFormState = {
  message: string;
  errors?: Partial<FormSchemaType>;
  values?: FormSchemaType;
};

export type cpfValidationState = {
  message: string;
  errors?: { cpf?: string };
};
