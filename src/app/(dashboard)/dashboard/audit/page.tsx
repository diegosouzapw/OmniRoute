import { redirect } from "next/navigation";

export default function ConfigAuditPage() {
  redirect("/dashboard/logs?tab=audit-logs");
}
