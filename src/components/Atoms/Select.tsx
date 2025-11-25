interface PropsSelect {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  options: { value: string; label: string }[];
}

export default function Select(props: PropsSelect) {
  const { placeholder = "Seleccione una opción", onChange, value, options } = props;

  return (
    <select
      className="form-select"
      value={value || ""}
      onChange={onChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

