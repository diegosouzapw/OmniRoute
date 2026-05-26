import { redirect } from "next/navigation";

export default function MitmProxyPage() {
  // MITM Proxy será movido para Tools/AgentBridge (plano 11)
  redirect("/dashboard/system/proxy");
}
