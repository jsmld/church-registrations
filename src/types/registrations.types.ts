export type RegistrationsState = {
  message: string;
  errors?: {
    cpf?: string[];
    name?: string[];
    email?: string[];
    gender?: string[];
    marital_status?: string[];
    birth_date?: string[];
    age?: string[];
    phone?: string[];
    city?: string[];
    state?: string[];
    neighborhood?: string[];
    street?: string[];
    street_number?: string[];
    complement?: string[];
  };
};
