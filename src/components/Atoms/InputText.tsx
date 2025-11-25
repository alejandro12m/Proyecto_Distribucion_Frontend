import { useState } from "react";
interface propsInputText {
  placeholder?: string;
  type?: string; // opcional, por defecto será "text"
  step?: string; // para inputs de tipo number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function InputText(props:propsInputText) {
  const { placeholder = "Escriba esto", type = "text", step, onChange, value } = props;
  const [texto, setTexto] = useState("");

  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : texto;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setTexto(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      type={type}
      className="form-control"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      step={step}
    />
  );
}