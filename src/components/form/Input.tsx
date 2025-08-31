import { FieldsName } from "@/types/registrations.types";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: FieldsName;
  label: string;
  icon?: React.ReactNode;
  error?: string;
  wrapperClassName?: string;
  type?: string;
  messageVallidator?: string;
  [key: string]: any;
};

export const Input = ({
  id,
  label,
  icon,
  error,
  wrapperClassName = "",
  type = "text",
  messageVallidator = "",
  ...props
}: InputProps) => {
  return (
    <div className={`${wrapperClassName}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className={`input validator text-md w-full`}>
        {icon}
        <input id={id} type={type} name={id} {...props} />
      </div>
      {error ? (
        <p className="text-sm text-orange-500">{error}</p>
      ) : (
        <p className="validator-hint">
          {messageVallidator || `${label} inválido`}
        </p>
      )}
    </div>
  );
};
