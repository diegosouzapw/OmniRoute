"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PatchBadge() {
  const [patchCount, setPatchCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/openclaw/status")
      .then((res) => res.json())
      .then((data) => {
        setPatchCount(data.patchCount || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading || patchCount === 0) return null;

  return (
    <Link
      href="/api/openclaw/"
      target="_blank"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors ml-2"
      title="Open Patch Manager"
    >
      <span>🩹</span>
      <span>Patched ({patchCount})</span>
    </Link>
  );
}
