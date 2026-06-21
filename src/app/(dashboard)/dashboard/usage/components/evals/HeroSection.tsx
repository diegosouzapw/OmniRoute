import { Card } from "@/shared/components";

export default function HeroSection({ t }: { t: (key: string, values?: Record<string, unknown>) => string }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div
        className="p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(16, 185, 129, 0.05) 100%)",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[28px]">science</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text-main mb-1">{t("modelEvals")}</h2>
            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              {t("evalsHeroDescription")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">
                  verified
                </span>
                {t("qualityValidation")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-sky-400">compare</span>
                {t("modelComparison")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-amber-400">
                  bug_report
                </span>
                {t("regressionDetection")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-violet-400">speed</span>
                {t("latencyBenchmarks")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
