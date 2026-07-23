import { Input } from "@/shared/components";
import { useTranslations } from "next-intl";

function translateOrFallback(
  t: ReturnType<typeof useTranslations>,
  key: string,
  fallback: string
): string {
  return typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

interface FusionDefaultsFieldsProps {
  comboDefaults: any;
  setComboDefaults: (updater: (prev: any) => any) => void;
}

/**
 * #5598 — Fusion-specific defaults for the Global Routing tab. Selecting the
 * "fusion" strategy previously showed only the generic resilience fields even
 * though fusion has real engine knobs (`open-sse/services/fusion.ts`, schema in
 * `src/shared/validation/schemas/combo.ts`): `judgeModel` synthesizes the final
 * answer and `fusionTuning` controls the quorum-grace panel collection. The
 * per-combo editor already exposes these; this surfaces the same knobs as global
 * defaults. (Voting / aggregation-mode / per-provider-weight do not exist in the
 * engine, so they are intentionally not shown.)
 */
export default function FusionDefaultsFields({
  comboDefaults,
  setComboDefaults,
}: FusionDefaultsFieldsProps) {
  const t = useTranslations("settings");
  const setTuning = (patch: Record<string, number | undefined>) =>
    setComboDefaults((prev: any) => ({
      ...prev,
      fusionTuning: { ...prev.fusionTuning, ...patch },
    }));
  const num = (value: string) => (value ? Number(value) : undefined);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-border/50">
      <Input
        label={translateOrFallback(t, "fusionJudgeModel", "Judge Model")}
        type="text"
        value={comboDefaults.judgeModel ?? ""}
        placeholder="openai/gpt-5.5"
        onChange={(e) =>
          setComboDefaults((prev: any) => ({ ...prev, judgeModel: e.target.value || undefined }))
        }
        className="text-sm md:col-span-2"
      />
      <Input
        label={translateOrFallback(t, "fusionMinPanel", "Min Panel")}
        type="number"
        min={1}
        max={50}
        value={comboDefaults.fusionTuning?.minPanel ?? ""}
        placeholder="2"
        onChange={(e) => setTuning({ minPanel: num(e.target.value) })}
        className="text-sm"
      />
      <Input
        label={translateOrFallback(t, "fusionStragglerGraceMs", "Straggler Grace (ms)")}
        type="number"
        min={0}
        max={120000}
        value={comboDefaults.fusionTuning?.stragglerGraceMs ?? ""}
        placeholder="8000"
        onChange={(e) => setTuning({ stragglerGraceMs: num(e.target.value) })}
        className="text-sm"
      />
      <Input
        label={translateOrFallback(t, "fusionPanelHardTimeoutMs", "Panel Hard Timeout (ms)")}
        type="number"
        min={1000}
        max={600000}
        value={comboDefaults.fusionTuning?.panelHardTimeoutMs ?? ""}
        placeholder="90000"
        onChange={(e) => setTuning({ panelHardTimeoutMs: num(e.target.value) })}
        className="text-sm md:col-span-2"
      />
      <div className="md:col-span-2 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          {translateOrFallback(
            t,
            "fusionDefaultsNote",
            "Fusion fans out to all of a combo's models and a judge model synthesizes the final answer (defaults to the first panel model when unset). These are global defaults for new or unconfigured combos."
          )}
        </p>
      </div>
    </div>
  );
}
