"use client";

import { ServiceStatusCard } from "../components/ServiceStatusCard";
import { ServiceLifecycleButtons } from "../components/ServiceLifecycleButtons";
import { ServiceLogsPanel } from "../components/ServiceLogsPanel";
import { NinerouterInstallWizard } from "../components/NinerouterInstallWizard";
import { NinerouterProviderExposureCard } from "../components/NinerouterProviderExposureCard";
import { NinerouterModelList } from "../components/NinerouterModelList";
import { AutoStartToggle } from "../components/AutoStartToggle";
import { ApiKeyField } from "../components/ApiKeyField";
import { NinerouterEmbedFrame } from "../components/NinerouterEmbedFrame";
import { useServiceStatus } from "../hooks/useServiceStatus";

const NAME = "9router";

export function NinerouterServiceTab() {
  const { data } = useServiceStatus(NAME);

  // Show only the install wizard when not yet installed.
  if (data?.state === "not_installed") {
    return (
      <div className="space-y-4">
        <NinerouterInstallWizard />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ServiceStatusCard name={NAME} />
      <ServiceLifecycleButtons name={NAME} />
      <AutoStartToggle
        name={NAME}
        description="Launch 9Router automatically when OmniRoute starts"
      />
      <ApiKeyField name={NAME} serviceLabel="9Router" showReveal={true} />
      <NinerouterProviderExposureCard />
      <NinerouterModelList />
      <NinerouterEmbedFrame />
      <ServiceLogsPanel name={NAME} />
    </div>
  );
}
