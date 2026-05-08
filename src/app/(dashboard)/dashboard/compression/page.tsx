import { redirect } from "next/navigation";

export const metadata = {
  title: "Compression",
  description: "Configure context compression settings to reduce token usage and costs.",
};

export default function CompressionPage() {
  redirect("/dashboard/context/caveman");
}
