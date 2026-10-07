"use client";
import { ComboLiveStudio } from "@/app/(dashboard)/dashboard/combos/live/ComboLiveStudio";
import type { ComboLiveStudioProps } from "@/app/(dashboard)/dashboard/combos/live/ComboLiveStudio";
import type { LiveComboEvent } from "@/hooks/useLiveDashboard";

/**
 * RoutingTab — reuses `ComboLiveStudio` untouched inside the Orchestration
 * Canvas. Receives all live data as props (the PageClient calls
 * `useLiveComboStatus`/`useProviderBreakerHealth` once and distributes) so
 * this tab never opens a second WebSocket connection.
 */
export function RoutingTab({
  comboEvents,
  combos,
  isConnected,
  providerHealth,
  connectionHealth,
}: {
  comboEvents: LiveComboEvent[];
  combos: string[];
  isConnected: boolean;
  providerHealth: ComboLiveStudioProps["providerHealth"];
  connectionHealth: ComboLiveStudioProps["connectionHealth"];
}) {
  return (
    <div className="h-full min-h-[480px]">
      <ComboLiveStudio
        comboEvents={comboEvents}
        combos={combos}
        isConnected={isConnected}
        providerHealth={providerHealth}
        connectionHealth={connectionHealth}
      />
    </div>
  );
}
