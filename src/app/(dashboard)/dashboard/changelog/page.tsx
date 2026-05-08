"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, SegmentedControl } from "@/shared/components";
import ChangelogViewer from "./components/ChangelogViewer";
import NewsViewer from "./components/NewsViewer";

export default function ChangelogPage() {
  const [activeTab, setActiveTab] = useState<"news" | "changelog">("news");
  const t = useTranslations("sidebar");
  const title = typeof t.has === "function" && t.has("changelog") ? t("changelog") : "Changelog";

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">{title}</h1>
          <p className="text-sm text-text-muted mt-1">
            Stay up to date with the latest platform features and announcements.
          </p>
        </div>
        <div className="shrink-0 w-full sm:w-[240px]">
          <SegmentedControl
            options={[
              { label: "News", value: "news" },
              { label: "Changelog", value: "changelog" },
            ]}
            value={activeTab}
            onChange={(val) => setActiveTab(val as "news" | "changelog")}
          />
        </div>
      </div>

      <Card className="min-h-[500px] overflow-hidden" padding="none">
        {activeTab === "news" ? <NewsViewer /> : <ChangelogViewer />}
      </Card>
    </div>
  );
}
