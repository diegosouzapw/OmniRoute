import { redirect } from "next/navigation";

export default function AutoComboRedirectPage() {
  redirect("/dashboard/combos?filter=intelligent");
}
