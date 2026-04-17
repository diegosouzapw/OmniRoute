import { DashboardLayout } from "@/shared/components";
import { ModelStatusProvider } from "./providers/components/ModelStatusContext";

export default function DashboardRootLayout({ children }) {
  return (
    <ModelStatusProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </ModelStatusProvider>
  );
}
