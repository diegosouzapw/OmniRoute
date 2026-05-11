"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

interface DocsBreadcrumbsProps {
  labels: Record<string, string>;
  className?: string;
}

export default function DocsBreadcrumbs({ labels, className }: DocsBreadcrumbsProps) {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, idx) => ({
    label: labels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
    href: "/" + segments.slice(0, idx + 1).join("/"),
    isLast: idx === segments.length - 1,
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-2 text-sm text-text-muted mb-6", className)}
    >
      <Link href="/" className="hover:text-text-main transition-colors">
        Docs
      </Link>
      {crumbs.map((crumb, i) => (
        <React.Fragment key={crumb.href}>
          <span className="text-text-muted">/</span>
          {crumb.isLast ? (
            <span className="font-medium text-text-primary">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-text-main transition-colors">
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
