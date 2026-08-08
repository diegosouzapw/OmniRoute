"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";

interface APIReferenceProps {
  name: string;
  type: string;
  description: string;
  params?: { name: string; type: string; description: string }[];
  returns?: { type: string; description: string };
  className?: string;
}

export default function APIReference({
  name,
  type,
  description,
  params,
  returns,
  className,
}: APIReferenceProps) {
  const t = useTranslations("docs.apiReferenceTable");
  return (
    <div
      role="region"
      aria-labelledby="api-ref-title"
      className={cn("my-6 p-6 rounded-xl border border-border bg-bg-subtle", className)}
    >
      <div className="flex items-center gap-2 mb-4">
        <code id="api-ref-title" className="text-lg font-mono font-bold text-primary">
          {name}
        </code>
        <span className="text-xs font-medium px-2 py-1 rounded bg-border text-text-muted">
          {type}
        </span>
      </div>
      <p className="text-text-main mb-6 leading-relaxed">{description}</p>

      {params && params.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-text-primary mb-3">{t("parameters")}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs text-text-muted uppercase bg-border/50">
                <tr>
                  <th className="px-4 py-2 border-b border-border" scope="col">
                    {t("name")}
                  </th>
                  <th className="px-4 py-2 border-b border-border" scope="col">
                    {t("type")}
                  </th>
                  <th className="px-4 py-2 border-b border-border" scope="col">
                    {t("description")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {params.map((param, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-3 font-mono text-text-main">{param.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{param.type}</td>
                    <td className="px-4 py-3 text-text-muted">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {returns && (
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-3">{t("returns")}</h4>
          <div className="p-3 rounded bg-bg border border-border font-mono text-sm">
            <span className="text-text-muted">{t("typePrefix")} </span>
            <span className="text-text-main">{returns.type}</span>
            <div className="text-xs text-text-muted mt-1">{returns.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}
