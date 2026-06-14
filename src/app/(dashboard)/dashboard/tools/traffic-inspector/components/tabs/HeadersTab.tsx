"use client";

import type { InterceptedRequest } from "@/mitm/inspector/types";
import { HeaderTable } from "../shared/HeaderTable";

interface HeadersTabProps {
  request: InterceptedRequest;
}

export function HeadersTab({ request }: HeadersTabProps) {
  return (
    <div className="space-y-4 overflow-auto h-full p-2">
      <section>
        <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          Request Headers
        </h3>
        <HeaderTable headers={request.requestHeaders} />
      </section>
      <section>
        <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          Response Headers
        </h3>
        <HeaderTable headers={request.responseHeaders} />
      </section>
    </div>
  );
}
