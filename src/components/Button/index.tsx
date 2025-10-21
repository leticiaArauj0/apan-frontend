import styles from "./styles.module.css";

interface ButtonProps {
  text: string;
  color?: "primary" | "secondary";
  size?: "medium" | "large";
  onClick?: () => void;
};

export default function Button({
  text,
  color = "primary",
  size = "medium",
  onClick,
}: ButtonProps) {
  const className = `${styles.button} ${styles[color]} ${styles[size]}`;

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}
