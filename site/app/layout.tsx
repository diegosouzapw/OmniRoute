import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy IA | Gateway de IA",
  description: "Planos de IA por combos, API keys, consumo e playground para clientes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
