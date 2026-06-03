import { redirect } from "next/navigation";

export default function OneProxyPage() {
  redirect("/dashboard/system/proxy?tab=free-pool");
}
