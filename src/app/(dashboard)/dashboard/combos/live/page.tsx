"use client";

import { ComboLiveStudio } from "./ComboLiveStudio";
import { useLiveComboStatus } from "@/hooks/useLiveDashboard";

/**
 * Combo/Routing Studio (Tela B) — live combo cascade.
 *
 * Thin route wrapper: subscribes to the `combo` WS channel via
 * `useLiveComboStatus` and feeds the events into the studio. `LiveComboEvent` is
 * structurally compatible with the studio's `ComboEventInput`. The studio shows a
 * "Live disabled" banner + empty state when the WS feed is off, so this degrades
 * gracefully.
 */
export default function ComboLiveStudioPage() {
  const { comboEvents, activeCombos, isConnected } = useLiveComboStatus();

  return (
    <div className="p-4 h-[calc(100dvh-6rem)] min-h-[480px]">
      <ComboLiveStudio
        comboEvents={comboEvents}
        combos={[...activeCombos]}
        isConnected={isConnected}
      />
    </div>
  );
}
