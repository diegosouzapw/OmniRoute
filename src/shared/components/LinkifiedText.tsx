import { Fragment } from "react";
import { linkifyText } from "@/shared/utils/linkify";

/**
 * #5486 — Render a string with any embedded http(s) URLs as clickable links.
 * Used by the OAuth error step so setup instructions (e.g. GitLab Duo's
 * "register an OAuth application at https://gitlab.com/-/profile/applications …")
 * are actionable instead of dead text. Links open in a new tab with a safe rel.
 */
export default function LinkifiedText({ text }: { text: string | null | undefined }) {
  return (
    <>
      {linkifyText(text || "").map((seg, i) =>
        seg.href ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-all"
          >
            {seg.text}
          </a>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        )
      )}
    </>
  );
}
