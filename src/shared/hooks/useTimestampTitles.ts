"use client";

import { useEffect, type RefObject } from "react";
import type { JsonViewProps } from "react18-json-view";

type CustomizeNode = NonNullable<JsonViewProps["customizeNode"]>;

// react18-json-view exposes no direct tooltip prop, but customizeNode gives a
// per-value className hook without touching what value is actually rendered
// -- the tree's byte-accurate rendering is the point, so a marker class + DOM
// title-attribute pass is safer here than swapping in a replacement element
// with hand-reproduced number formatting.
export const TIMESTAMP_VALUE_MARKER_CLASS = "json-tree-number-value";

const TIMESTAMP_FIELD_NAME = /created|updated|modified|timestamp|(^|_)ts$|_at$/i;
// Unix epoch bounds spanning year 2000 to year 2100, checked at both
// seconds and millisecond precision (both are common on the wire).
const EPOCH_SECONDS_MIN = 946684800;
const EPOCH_SECONDS_MAX = 4102444800;
const EPOCH_MS_MIN = EPOCH_SECONDS_MIN * 1000;
const EPOCH_MS_MAX = EPOCH_SECONDS_MAX * 1000;

function epochValueToDate(value: number): Date | null {
  if (!Number.isFinite(value)) return null;
  if (value >= EPOCH_SECONDS_MIN && value <= EPOCH_SECONDS_MAX) return new Date(value * 1000);
  if (value >= EPOCH_MS_MIN && value <= EPOCH_MS_MAX) return new Date(value);
  return null;
}

// react18-json-view's customizeNode receives the key (indexOrName) and value
// (node) together, so the timestamp-field-name check can run at the source
// instead of a DOM sibling-walk -- it only needs to mark the match, the
// tooltip text itself is still applied via useTimestampTitles below.
export const timestampMarkerCustomizeNode: CustomizeNode = ({ node, indexOrName }) => {
  if (typeof indexOrName !== "string" || !TIMESTAMP_FIELD_NAME.test(indexOrName)) {
    return undefined;
  }
  if (typeof node !== "number" || !epochValueToDate(node)) {
    return undefined;
  }
  return { className: TIMESTAMP_VALUE_MARKER_CLASS };
};

// Adds a human-readable date/time title (tooltip) to marked number values.
// Re-runs on any DOM change inside the container (expanding an individual
// node is internal react18-json-view state, not a prop change this
// component would otherwise see) and is idempotent, so it's safe to call
// repeatedly as the tree gets expanded/collapsed.
export function useTimestampTitles(containerRef: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    const annotate = () => {
      const values = container.querySelectorAll<HTMLElement>(`.${TIMESTAMP_VALUE_MARKER_CLASS}`);
      for (const valueEl of values) {
        if (valueEl.title) continue;
        const date = epochValueToDate(Number(valueEl.textContent));
        if (!date) continue;
        valueEl.title = date.toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "medium",
        });
      }
    };

    annotate();
    const observer = new MutationObserver(annotate);
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [containerRef, active]);
}
