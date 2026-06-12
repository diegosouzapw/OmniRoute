"use client";

// Phase 1t.2 extraction — Issue #3501
import { useRouter } from "next/navigation";
import { Card, Button } from "@/shared/components";
import { getApiLabel, getApiPath } from "../providerPageHelpers";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface ProviderNode {
  baseUrl?: string;
  apiType?: string;
  chatPath?: string;
  prefix?: string;
  [key: string]: unknown;
}

interface CompatibleNodeCardProps {
  providerId: string;
  providerNode: ProviderNode;
  isCcCompatible: boolean;
  isAnthropicCompatible: boolean;
  isAnthropicProtocolCompatible: boolean;
  gateConnectionFlow: (callback: () => void) => void;
  openApiKeyAddFlow: () => void;
  onOpenEditNodeModal: () => void;
  t: ProviderMessageTranslator;
}

export default function CompatibleNodeCard({
  providerId,
  providerNode,
  isCcCompatible,
  isAnthropicCompatible,
  isAnthropicProtocolCompatible,
  gateConnectionFlow,
  openApiKeyAddFlow,
  onOpenEditNodeModal,
  t,
}: CompatibleNodeCardProps) {
  const router = useRouter();

  return (
    <Card>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {isCcCompatible
              ? t("ccCompatibleDetailsTitle")
              : isAnthropicCompatible
                ? t("anthropicCompatibleDetails")
                : t("openaiCompatibleDetails")}
          </h2>
          <p className="text-sm text-text-muted">
            {getApiLabel(t, isAnthropicProtocolCompatible, providerNode?.apiType)} ·{" "}
            {(providerNode.baseUrl || "").replace(/\/$/, "")}/
            {getApiPath(
              isCcCompatible,
              isAnthropicCompatible,
              providerNode?.apiType,
              providerNode?.chatPath
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" icon="add" onClick={() => gateConnectionFlow(openApiKeyAddFlow)}>
            {t("add")}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            icon="edit"
            onClick={onOpenEditNodeModal}
          >
            {t("edit")}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            icon="delete"
            onClick={async () => {
              if (
                !confirm(
                  t("deleteCompatibleNodeConfirm", {
                    type: isCcCompatible
                      ? t("ccCompatibleLabel")
                      : isAnthropicCompatible
                        ? t("anthropic")
                        : t("openai"),
                  })
                )
              )
                return;
              try {
                const res = await fetch(`/api/provider-nodes/${providerId}`, {
                  method: "DELETE",
                });
                if (res.ok) {
                  router.push("/dashboard/providers");
                }
              } catch (error) {
                console.error("Error deleting provider node:", error);
              }
            }}
          >
            {t("delete")}
          </Button>
        </div>
      </div>
      {isCcCompatible && (
        <div className="mb-4 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
              warning
            </span>
            <p>{t("ccCompatibleValidationHint")}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
