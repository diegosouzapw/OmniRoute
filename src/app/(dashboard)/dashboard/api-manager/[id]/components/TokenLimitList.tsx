"use client";

import type { TokenLimitRow } from "../apiKeyDetailsData";
import { TokenLimitListItem } from "./TokenLimitListItem";
import type { ScopeType } from "./tokenLimitsEditorTypes";

/** Saved token-limit rows for {@link TokenLimitsEditor}. */
export function TokenLimitList({
  limits,
  saving,
  scopeText,
  onEdit,
  onDelete,
}: {
  limits: TokenLimitRow[];
  saving: boolean;
  scopeText: (scopeType: ScopeType, scopeValue: string) => string;
  onEdit: (row: TokenLimitRow) => void;
  onDelete: (row: TokenLimitRow) => void;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {limits.map((row) => (
        <TokenLimitListItem
          key={row.id}
          row={row}
          scope={scopeText(row.scopeType, row.scopeValue)}
          saving={saving}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      ))}
    </ul>
  );
}
