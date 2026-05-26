"use client";

import { useTranslations } from "next-intl";
import { Card, Input, Toggle } from "@/shared/components";
import ApiKeyFilterChip from "./ApiKeyFilterChip";
import type { KeyStatus, KeyType, ApiKeyCounts } from "../apiManagerPageUtils";

interface ApiKeyFilterBarProps {
  counts: ApiKeyCounts;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeOnly: boolean;
  onActiveOnlyChange: (v: boolean) => void;
  statusFilter: KeyStatus | null;
  onStatusChange: (s: KeyStatus | null) => void;
  typeFilter: KeyType | null;
  onTypeChange: (t: KeyType | null) => void;
}

export default function ApiKeyFilterBar({
  counts,
  searchQuery,
  onSearchChange,
  activeOnly,
  onActiveOnlyChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
}: ApiKeyFilterBarProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  const statusChips: Array<{
    value: KeyStatus | null;
    label: string;
    dotColor: string | null;
    count: number;
  }> = [
    { value: null, label: t("filterAll"), dotColor: null, count: counts.total },
    {
      value: "active",
      label: t("filterStatusActive"),
      dotColor: "bg-green-500",
      count: counts.active,
    },
    {
      value: "disabled",
      label: t("filterStatusDisabled"),
      dotColor: "bg-gray-500",
      count: counts.disabled,
    },
    {
      value: "banned",
      label: t("filterStatusBanned"),
      dotColor: "bg-red-500",
      count: counts.banned,
    },
    {
      value: "expired",
      label: t("filterStatusExpired"),
      dotColor: "bg-amber-500",
      count: counts.expired,
    },
  ];

  const typeChips: Array<{
    value: KeyType | null;
    label: string;
    dotColor: string | null;
    count: number;
  }> = [
    { value: null, label: t("filterAll"), dotColor: null, count: counts.total },
    {
      value: "standard",
      label: t("filterTypeStandard"),
      dotColor: "bg-slate-500",
      count: counts.standard,
    },
    {
      value: "manage",
      label: t("filterTypeManage"),
      dotColor: "bg-rose-500",
      count: counts.manage,
    },
    {
      value: "restricted",
      label: t("filterTypeRestricted"),
      dotColor: "bg-amber-500",
      count: counts.restricted,
    },
  ];

  return (
    <Card padding="sm">
      <div className="flex flex-col gap-3">
        {/* Row 1: Search + Active Only toggle */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[160px]">
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              icon="search"
              inputClassName={searchQuery ? "pr-9" : ""}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-text-muted hover:text-text-primary transition-colors"
                aria-label={tc("clear")}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <Toggle
            size="sm"
            checked={activeOnly}
            onChange={(v) => {
              onActiveOnlyChange(v);
              // When enabling activeOnly, reset statusFilter if it's not "active"
              if (v && statusFilter !== null && statusFilter !== "active") {
                onStatusChange(null);
              }
            }}
            label={t("activeOnly")}
            className="rounded-lg border border-border bg-bg-subtle px-3 py-1.5"
          />
        </div>

        {/* STATUS + TYPE chips — single row on >=1280px, wraps below on smaller */}
        <div className="border-t border-border pt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mr-1">
              {t("filterStatus")}:
            </span>
            {statusChips.map((chip) => (
              <ApiKeyFilterChip
                key={chip.value ?? "all"}
                label={chip.label}
                count={chip.count}
                isActive={
                  statusFilter === chip.value ||
                  (chip.value === "active" && activeOnly && statusFilter === null)
                }
                dotColor={chip.dotColor}
                onClick={() => {
                  onStatusChange(chip.value);
                  // If user picks a non-active status chip while activeOnly is on, turn off activeOnly
                  if (chip.value !== null && chip.value !== "active" && activeOnly) {
                    onActiveOnlyChange(false);
                  }
                }}
              />
            ))}
          </div>

          <div aria-hidden="true" className="hidden xl:block h-6 w-px bg-border self-center" />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mr-1">
              {t("filterType")}:
            </span>
            {typeChips.map((chip) => (
              <ApiKeyFilterChip
                key={chip.value ?? "all"}
                label={chip.label}
                count={chip.count}
                isActive={typeFilter === chip.value}
                dotColor={chip.dotColor}
                onClick={() => onTypeChange(chip.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
