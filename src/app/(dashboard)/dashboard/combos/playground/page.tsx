import type { Metadata } from "next";
import ComboPlaygroundClient from "./ComboPlaygroundClient";

export const metadata: Metadata = {
  title: "OmniRoute — Combo Playground",
  description: "Simulate combo routing paths visually",
};

export default function ComboPlaygroundPage() {
  return <ComboPlaygroundClient />;
}
