import { permanentRedirect } from "next/navigation";

export default function LogsActivityRedirect() {
  permanentRedirect("/dashboard/activity");
}
