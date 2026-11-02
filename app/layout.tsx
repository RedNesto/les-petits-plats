import type { Metadata } from "next";
import { manropeSans } from "@/app/fonts";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Les Petits Plats",
  description: "Découvrez no recettes du quotidien, simples et délicieuses",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manropeSans.className}`}>
    <body>
    {children}
    <Footer/>
    </body>
    </html>
  );
}
