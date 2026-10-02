"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

// Cells and footer shared by the model and combo catalog tables; the markup matches what each
// table rendered inline, so both keep the same DOM, labels and classes.

const CHECKBOX_CLASS =
  "rounded border-black/20 text-primary focus:ring-primary dark:border-white/20";

/** A column heading without sorting. */
export function PlainHeading({ children }: { children: ReactNode }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
    >
      {children}
    </th>
  );
}

/** The right-aligned heading above the per-row test buttons. */
export function ActionsHeading() {
  const t = useTranslations("modelCatalog");
  return (
    <th
      scope="col"
      className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted"
    >
      {t("actions")}
    </th>
  );
}

/** Page-wide selection checkbox; `indeterminate` marks a partly selected page. */
export function SelectAllHeaderCell({
  checked,
  indeterminate,
  onToggle,
  label,
}: {
  checked: boolean;
  indeterminate: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <th scope="col" className="w-10 px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={onToggle}
        aria-label={label}
        className={CHECKBOX_CLASS}
      />
    </th>
  );
}

export function SelectRowCell({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <td className="w-10 px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        aria-label={label}
        className={CHECKBOX_CLASS}
      />
    </td>
  );
}

/** Result summary (the children) plus previous/next paging under a catalog table. */
export function CatalogTableFooter({
  page,
  pageCount,
  onPrevious,
  onNext,
  children,
}: {
  page: number;
  pageCount: number;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
}) {
  const t = useTranslations("modelCatalog");
  return (
    <footer className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-text-muted" aria-live="polite">
        {children}
      </p>
      <div className="flex items-center gap-3">
        <span className="text-sm text-text-muted">{t("page", { page, pageCount })}</span>
        <Button variant="secondary" size="sm" disabled={page === 1} onClick={onPrevious}>
          {t("previous")}
        </Button>
        <Button variant="secondary" size="sm" disabled={page >= pageCount} onClick={onNext}>
          {t("next")}
        </Button>
      </div>
    </footer>
  );
}
