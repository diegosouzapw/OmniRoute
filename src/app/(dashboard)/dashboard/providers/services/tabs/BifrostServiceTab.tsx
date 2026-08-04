"use client";

import { ServiceStatusCard } from "../components/ServiceStatusCard";
import { ServiceLifecycleButtons } from "../components/ServiceLifecycleButtons";
import { ServiceLogsPanel } from "../components/ServiceLogsPanel";
import { AutoStartToggle } from "../components/AutoStartToggle";

const NAME = "bifrost";

export function BifrostServiceTab() {
  return (
    <div className="space-y-4">
      <ServiceStatusCard name={NAME} />
      <ServiceLifecycleButtons name={NAME} />
      <AutoStartToggle name={NAME} />
      <ServiceLogsPanel name={NAME} />
    </div>
  );
}
