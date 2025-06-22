import styles from "./index.module.css";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <a href={href} className={styles.button}>
      {children}
    </a>
  );
}
