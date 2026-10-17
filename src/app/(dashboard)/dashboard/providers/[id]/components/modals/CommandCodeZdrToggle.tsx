"use client";

import { useTranslations } from "next-intl";
import { Toggle } from "@/shared/components";

/**
 * Per-connection "Require Zero Data Retention" switch for Command Code API keys.
 * When on, the connection's upstream calls and its validation probe send `x-cmd-zdr: 1`.
 * Renders nothing for any other provider.
 */
export default function CommandCodeZdrToggle({
  provider,
  checked,
  onChange,
}: {
  provider?: string | null;
  checked: boolean | undefined;
  onChange: (checked: boolean) => void;
}) {
  const t = useTranslations("providers");
  if (provider !== "command-code") return null;
  return (
    <Toggle
      checked={checked === true}
      onChange={onChange}
      label={t("commandCodeZdrLabel")}
      description={t("commandCodeZdrHint")}
    />
  );
}
