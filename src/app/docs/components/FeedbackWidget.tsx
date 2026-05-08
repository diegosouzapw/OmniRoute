"use client";

import React, { useState } from "react";

export function FeedbackWidget({ slug }: { slug: string }) {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (type: "yes" | "no") => {
    setFeedback(type);
    setSubmitted(true);
    try {
      const stored = JSON.parse(localStorage.getItem("docs-feedback") || "{}");
      stored[slug] = type;
      localStorage.setItem("docs-feedback", JSON.stringify(stored));
    } catch {}
  };

  if (submitted) {
    return (
      <div className="mt-8 p-4 bg-bg-subtle border border-border rounded-lg text-center">
        <span className="material-symbols-outlined text-primary text-2xl block mb-1">
          check_circle
        </span>
        <p className="text-sm text-text-main">Thanks for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-bg-subtle border border-border rounded-lg">
      <p className="text-sm text-text-main mb-3">Was this page helpful?</p>
      <div className="flex gap-3">
        <button
          onClick={() => handleFeedback("yes")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm">thumb_up</span>
          Yes
        </button>
        <button
          onClick={() => handleFeedback("no")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:border-red-400 hover:text-red-400 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">thumb_down</span>
          No
        </button>
      </div>
    </div>
  );
}
