"use client";

import React, { useEffect, useRef, useState } from "react";

export function DocCodeBlocks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const pres = container.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.parentElement?.querySelector(".copy-btn")) return;

      pre.parentElement?.classList.add("relative");
      const btn = document.createElement("button");
      btn.className = "copy-btn absolute top-2 right-2 p-1.5 bg-bg border border-border rounded-md hover:bg-bg-subtle transition-colors opacity-0 group-hover:opacity-100";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = '<span class="material-symbols-outlined text-sm text-text-muted">content_copy</span>';

      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.textContent || pre.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
        } catch {
          const textarea = document.createElement("textarea");
          textarea.value = code;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        btn.innerHTML = '<span class="material-symbols-outlined text-sm text-primary">check</span>';
        btn.setAttribute("aria-label", "Copied");
        setTimeout(() => {
          btn.innerHTML = '<span class="material-symbols-outlined text-sm text-text-muted">content_copy</span>';
          btn.setAttribute("aria-label", "Copy code");
        }, 2000);
      });

      pre.parentElement?.appendChild(btn);
    });
  }, []);

  return <div ref={containerRef} className="hidden" />;
}