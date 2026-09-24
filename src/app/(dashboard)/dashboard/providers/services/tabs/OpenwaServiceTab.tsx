"use client";

import { ServiceStatusCard } from "../components/ServiceStatusCard";
import { ServiceLifecycleButtons } from "../components/ServiceLifecycleButtons";
import { ServiceLogsPanel } from "../components/ServiceLogsPanel";
import { AutoStartToggle } from "../components/AutoStartToggle";
import { AutoRestartAdoptedToggle } from "../components/AutoRestartAdoptedToggle";

const NAME = "openwa";

export function OpenwaServiceTab() {
  return (
    <div className="space-y-4">
      {/* English literal, not an i18n key — mirrors the "adopted process" note
          in ServiceStatusCard.tsx. open-wa is unofficial and unaffiliated with
          WhatsApp; automating a personal number carries a ban risk. */}
      <p className="text-xs text-text-muted flex items-start gap-1">
        <span className="material-symbols-outlined text-[14px] shrink-0 mt-0.5">warning</span>
        <span>
          open-wa (@open-wa/wa-automate) is an unofficial WhatsApp Web automation library, not
          affiliated with or endorsed by WhatsApp. The connected number can be banned by WhatsApp
          for automated use. On first start, scan the pairing QR code from the Logs panel below —
          the status stays &quot;starting&quot; until the scan completes (up to a few minutes), not
          an error.
        </span>
      </p>
      <ServiceStatusCard name={NAME} />
      <ServiceLifecycleButtons name={NAME} />
      <AutoStartToggle name={NAME} />
      <AutoRestartAdoptedToggle name={NAME} />
      <ServiceLogsPanel name={NAME} />
    </div>
  );
}
