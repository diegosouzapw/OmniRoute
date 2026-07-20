"use client";

import { useState } from "react";
import { Card, SegmentedControl } from "@/shared/components";
import ChangelogViewer from "./components/ChangelogViewer";
import NewsViewer from "./components/NewsViewer";

export default function ChangelogPage() {
  const [activeTab, setActiveTab] = useState<"news" | "changelog">("news");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <div className="w-full sm:w-[240px]">
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
