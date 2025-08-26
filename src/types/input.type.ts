import { RegistrationsFormState, FieldsName } from "./registrations.types";

export type InputProps = {
  id: FieldsName;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  pattern?: string;
  placeholder?: string;
  state?: RegistrationsFormState;
  requeired?: any;
  className?: string;
};
