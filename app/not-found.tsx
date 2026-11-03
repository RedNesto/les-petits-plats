import styles from "@/app/not-found.module.css";
import Link from "next/link";
import Image from "next/image";
import { antonSans } from "@/app/fonts";

export default function NotFound() {
  return (
    <main>
      <main className={styles.notFound + " " + antonSans.className}>
        <Link href={"/"}><Image className={styles.logo} src="/logo.png" width={207} height={25} alt="Logo"/></Link>
        <h1>404 :(</h1>
        <p>La page que vous demandez est introuvable.</p>
      </main>
    </main>
  );
}
