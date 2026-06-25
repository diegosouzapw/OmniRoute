"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

interface Execution {
  id: string;
  skillId: string;
  skillName: string;
  status: string;
  duration: number;
  createdAt: string;
}

interface OmniExecutionsTabProps {
  executions: Execution[];
  execPage: number;
  execTotalPages: number;
  execTotal: number;
  onPagePrev: () => void;
  onPageNext: () => void;
}

export function OmniExecutionsTab({
  executions,
  execPage,
  execTotalPages,
  execTotal,
  onPagePrev,
  onPageNext,
}: OmniExecutionsTabProps): JSX.Element {
  const t = useTranslations("skills");

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-text-muted border-b border-border">
              <th className="pb-3 font-medium">{t("skill")}</th>
              <th className="pb-3 font-medium">{t("status")}</th>
              <th className="pb-3 font-medium">{t("duration")}</th>
              <th className="pb-3 font-medium">{t("time")}</th>
            </tr>
          </thead>
          <tbody>
            {executions.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-muted">
                  {t("noExecutions")}
                </td>
              </tr>
            ) : (
              executions.map((exec) => (
                <tr key={exec.id} className="border-b border-border/50">
                  <td className="py-3 font-medium">{exec.skillName}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        exec.status === "success"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : exec.status === "error"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {exec.status}
                    </span>
                  </td>
                  <td className="py-3 text-text-muted">{exec.duration}ms</td>
                  <td className="py-3 text-text-muted text-sm">
                    {new Date(exec.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-sm text-text-muted">
          {t("pageInfo", { page: execPage, totalPages: execTotalPages, total: execTotal }) ||
            `Page ${execPage} of ${execTotalPages} (${execTotal} total)`}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onPagePrev}
            disabled={execPage === 1}
            className="px-3 py-1 text-sm rounded border border-border text-text-muted hover:text-text-main disabled:opacity-40 transition-colors"
          >
            {t("previous") || "Prev"}
          </button>
          <button
            onClick={onPageNext}
            disabled={execPage === execTotalPages || execTotalPages === 0}
            className="px-3 py-1 text-sm rounded border border-border text-text-muted hover:text-text-main disabled:opacity-40 transition-colors"
          >
            {t("next") || "Next"}
          </button>
        </div>
      </div>
    </Card>
  );
}
