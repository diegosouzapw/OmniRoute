import type { Metadata } from "next";
import PortalClient from "./PortalClient";

export const metadata: Metadata = {
  title: "Area do Cliente | Easy IA",
  description:
    "Portal do cliente com API key, consumo, financeiro, renovacao, recarga e playground.",
};

export default function PortalPage() {
  return <PortalClient />;
}
