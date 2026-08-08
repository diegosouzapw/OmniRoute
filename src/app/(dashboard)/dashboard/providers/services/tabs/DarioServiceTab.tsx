"use client";

import { ServiceStatusCard } from "../components/ServiceStatusCard";
import { ServiceLifecycleButtons } from "../components/ServiceLifecycleButtons";
import { ServiceLogsPanel } from "../components/ServiceLogsPanel";
import { AutoStartToggle } from "../components/AutoStartToggle";
import { AutoRestartAdoptedToggle } from "../components/AutoRestartAdoptedToggle";
import { DarioAccountPanel } from "../components/DarioAccountPanel";

const NAME = "dario";

export function DarioServiceTab() {
  return (
    <div className="space-y-4">
      <ServiceStatusCard name={NAME} />
      <ServiceLifecycleButtons name={NAME} />
      <AutoStartToggle name={NAME} />
      <AutoRestartAdoptedToggle name={NAME} />
      <DarioAccountPanel />
      <ServiceLogsPanel name={NAME} />
    </div>
  );
}
