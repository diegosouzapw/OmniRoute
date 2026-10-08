"use client";

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import { formatRemaining } from "@/shared/utils/formatRemaining";
import type { CooldownConnection, CooldownStatus } from "@/lib/resilience/cooldownManager";

const STATUS_VARIANT: Record<CooldownStatus, "warning" | "error" | "info" | "success"> = {
  cooling_down: "warning",
  model_locked: "warning",
  unavailable: "info",
  terminal: "error",
  healthy: "success",
};

/** Connections whose state the manager can lift (terminal states need new credentials). */
export function isClearable(connection: CooldownConnection): boolean {
  return connection.status !== "terminal" && connection.status !== "healthy";
}

function remainingMs(connection: CooldownConnection): number {
  const lockoutMs = Math.max(0, ...connection.lockouts.map((lockout) => lockout.remainingMs));
  return Math.max(connection.cooldownRemainingMs, lockoutMs);
}

function LastError({ connection }: { connection: CooldownConnection }) {
  const t = useTranslations("resilienceCooldowns");
  if (!connection.lastErrorType && !connection.errorCode) return <span>{t("list.none")}</span>;
  return (
    <span>{[connection.lastErrorType, connection.errorCode].filter(Boolean).join(" · ")}</span>
  );
}

export default function CooldownRow({
  connection,
  selected,
  busy,
  onToggle,
  onClear,
}: {
  connection: CooldownConnection;
  selected: boolean;
  busy: boolean;
  onToggle: (id: string, checked: boolean) => void;
  onClear: (id: string) => void;
}) {
  const t = useTranslations("resilienceCooldowns");
  const clearable = isClearable(connection);
  const remaining = remainingMs(connection);
  const lockedModels = connection.lockouts.map((lockout) => lockout.model).join(", ");

  return (
    <tr className="border-t border-border">
      <td className="px-3 py-2">
        <Checkbox
          checked={selected}
          disabled={!clearable}
          aria-label={t("list.select")}
          onChange={(event) => onToggle(connection.id, event.target.checked)}
        />
      </td>
      <td className="px-3 py-2">
        <div className="font-medium text-text-main">
          {connection.name ?? connection.id.slice(0, 8)}
        </div>
        <div className="text-xs text-text-muted">{connection.authType}</div>
      </td>
      <td className="px-3 py-2">{connection.provider}</td>
      <td className="px-3 py-2">
        <Badge variant={STATUS_VARIANT[connection.status]} size="sm">
          {t(`status.${connection.status}`)}
        </Badge>
      </td>
      <td className="px-3 py-2">{remaining > 0 ? formatRemaining(remaining) : "-"}</td>
      <td className="px-3 py-2" title={lockedModels}>
        {connection.lockouts.length}
      </td>
      <td className="px-3 py-2 text-text-muted">
        <LastError connection={connection} />
      </td>
      <td className="px-3 py-2 text-right">
        <Button
          size="sm"
          variant="secondary"
          disabled={!clearable || busy}
          onClick={() => onClear(connection.id)}
        >
          {t("list.clear")}
        </Button>
      </td>
    </tr>
  );
}
