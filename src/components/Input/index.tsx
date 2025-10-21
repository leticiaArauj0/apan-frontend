import styles from "./styles.module.css";

interface InputProps {
    placeholder: string
    type?: string
}

export default function Input({placeholder, type='text'}: InputProps) {
  return (
    <input className={styles.input} type={type} placeholder={placeholder}/>
  );
}
