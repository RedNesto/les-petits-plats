import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Les Petits Plats",
  description: "Découvrez no recettes du quotidien, simples et délicieuses",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manropeSans.className}`}>
    <body>
    {children}
    </body>
    </html>
  );
}
