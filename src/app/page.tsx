// Auto-initialize cloud sync when server starts
import "@/lib/initCloudSync";
import { redirect } from "next/navigation";

export default function InitPage() {
  redirect("/dashboard");
}
