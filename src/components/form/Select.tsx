import {
  RegistrationsFormState,
  FieldsName,
} from "@/types/registrations.types";

type Option = {
  value: string;
  label: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: FieldsName;
  label: string;
  options: Option[];
  err?: string;
  wrapperClassName?: string;
  messageVallidator?: string;
  [key: string]: any;
};

export const Select = ({
  id,
  label,
  options = [],
  error,
  wrapperClassName = "",
  messageVallidator = "",
  ...props
}: SelectProps) => {
  return (
    <div className={`${wrapperClassName}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select className="select text-md w-full" name={id} id={id} {...props}>
        <option disabled={true} selected value="" key="default">
          {`Selecione ${label.toLocaleLowerCase()}`}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="text-sm text-orange-500">{error}</p>
      ) : (
        <p className="validator-hint">
          {messageVallidator || "opçao inválida"}
        </p>
      )}
    </div>
  );
};
