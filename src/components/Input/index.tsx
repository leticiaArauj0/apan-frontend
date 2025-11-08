import { ChangeEventHandler } from "react";
import styles from "./styles.module.css";

interface InputProps {
    placeholder: string
    type?: string
    value?: string | number | readonly string[] | undefined
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function Input({placeholder, type='text', value, onChange}: InputProps) {
  return (
    <input className={styles.input} type={type} placeholder={placeholder} value={value} onChange={onChange}/>
  );
}
