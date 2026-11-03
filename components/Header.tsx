import styles from "./Header.module.css"
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"}><Image className={styles.logo} src="/logo.png" width={207} height={25} alt="Logo"/></Link>
    </header>
  );
}
