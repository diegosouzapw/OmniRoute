"use client";

import { ServiceStatusCard } from "../components/ServiceStatusCard";
import { ServiceLifecycleButtons } from "../components/ServiceLifecycleButtons";
import { ServiceLogsPanel } from "../components/ServiceLogsPanel";

const NAME = "9router";

/** T-14 will flesh out this tab with 9router-specific settings and the embedded iframe. */
export function NinerouterServiceTab() {
  return (
    <div className="space-y-4">
      <ServiceStatusCard name={NAME} />
      <ServiceLifecycleButtons name={NAME} />
      <ServiceLogsPanel name={NAME} />
    </div>
  );
}
