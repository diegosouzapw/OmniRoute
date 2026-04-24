import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Easy IA | Planos e combos de IA",
  description:
    "Plataforma brasileira de IA por combos, com planos, playground, area do cliente e checkout integrado.",
};

export default function HomePage() {
  return <HomeClient />;
}
