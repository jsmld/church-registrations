import { InputProps } from "@/types/input.type";

export const Input = ({
  id,
  label,
  icon,
  type = "text",
  placeholder = "",
  pattern,
  state,
  requeired,
  className = "",
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className={`input validator text-md ${className}`}>
        {icon}
        <input
          id={id}
          type={type}
          name={id}
          placeholder={placeholder}
          defaultValue={state?.values?.[id] || ""}
          pattern={pattern}
          {...requeired}
        />
      </div>
      <p className="validator-hint">
        {state?.errors?.cpf ? state.errors?.cpf : "CPF deve ter 11 caracteres."}
      </p>
    </div>
  );
};
