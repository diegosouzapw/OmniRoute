"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

export function OmniSandboxTab(): JSX.Element {
  const t = useTranslations("skills");

  return (
    <div className="grid gap-4">
      <Card>
        <h3 className="font-semibold mb-4">{t("sandboxConfig")}</h3>
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
            <div>
              <p className="font-medium">{t("cpuLimit")}</p>
              <p className="text-xs text-text-muted">{t("cpuLimitDesc")}</p>
            </div>
            <span className="font-mono">100ms</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
            <div>
              <p className="font-medium">{t("memoryLimit")}</p>
              <p className="text-xs text-text-muted">{t("memoryLimitDesc")}</p>
            </div>
            <span className="font-mono">256MB</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
            <div>
              <p className="font-medium">{t("timeout")}</p>
              <p className="text-xs text-text-muted">{t("timeoutDesc")}</p>
            </div>
            <span className="font-mono">30s</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
            <div>
              <p className="font-medium">{t("networkAccess")}</p>
              <p className="text-xs text-text-muted">{t("networkAccessDesc")}</p>
            </div>
            <span className="text-text-muted">{t("disabled")}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OmniSandboxTab;
