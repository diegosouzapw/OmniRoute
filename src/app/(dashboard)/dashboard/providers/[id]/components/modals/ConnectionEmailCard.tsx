"use client";

import { maskEmail } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";

/**
 * Read-only account e-mail shown in the connection edit modal. Honors the
 * global e-mail privacy toggle: masked unless e-mails are visible. Renders
 * nothing when the connection has no e-mail.
 */
export default function ConnectionEmailCard({
  email,
  label,
}: {
  email?: string | null;
  label: string;
}) {
  const showEmail = useEmailPrivacyStore((state) => state.emailsVisible);
  if (!email) return null;
  return (
    <div className="bg-sidebar/50 p-3 rounded-lg">
      <p className="text-sm text-text-muted mb-1">{label}</p>
      <p className="font-medium" title={showEmail ? email : undefined}>
        {showEmail ? email : maskEmail(email)}
      </p>
    </div>
  );
}
