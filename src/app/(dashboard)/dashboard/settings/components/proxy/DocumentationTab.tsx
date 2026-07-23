"use client";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

export default function DocumentationTab() {
  const t = useTranslations("settings");

  return (
    <Card className="p-6 space-y-6">
      <section>
        <h3 className="font-semibold mb-2">{t("proxyDocumentationScopeTitle")}</h3>
        <p className="text-sm text-text-muted">
          {t("proxyDocumentationScopeDescBefore")}
          <strong>{t("proxyDocumentationScopeOrder")}</strong>
          {t("proxyDocumentationScopeDescAfter")}
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">{t("proxyDocumentationAddTitle")}</h3>
        <p className="text-sm text-text-muted">
          {t("proxyDocumentationAddDescBefore")}
          <strong>{t("proxyPoolTab")}</strong>
          {t("proxyDocumentationAddDescMiddle")}
          <em>{t("proxyDocumentationAddCta")}</em>
          {t("proxyDocumentationAddDescAfter")}
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">{t("proxyDocumentationBulkTitle")}</h3>
        <pre className="text-xs bg-surface-alt/50 p-3 rounded mt-1 overflow-x-auto">
          {`http://user:pass@1.2.3.4:8080\nhttps://5.6.7.8:3128\nsocks5://9.0.1.2:1080`}
        </pre>
        <p className="text-sm text-text-muted mt-1">
          {t("proxyDocumentationBulkDesc")} <code>type|host|port|user|pass|name</code>
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">SOCKS5</h3>
        <p className="text-sm text-text-muted">
          {t("proxyDocumentationSocks5DescBefore")}{" "}
          <code className="bg-surface-alt px-1 rounded">ENABLE_SOCKS5_PROXY=false</code> to disable
          (ON by default).
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">{t("freePoolTab")}</h3>
        <p className="text-sm text-text-muted">
          {t("proxyDocumentationFreePoolDesc")}
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Vercel Relay</h3>
        <p className="text-sm text-text-muted">
          {t("proxyDocumentationVercelRelayDescBefore")} (
          <code className="bg-surface-alt px-1 rounded">x-relay-auth</code>). {t("proxyDocumentationVercelRelayDescAfter")}
        </p>
      </section>
    </Card>
  );
}
