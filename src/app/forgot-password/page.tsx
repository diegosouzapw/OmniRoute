"use client";

import { useTranslations } from "next-intl";

/**
 * Forgot Password Page — Phase 8.2
 *
 * Provides two recovery methods:
 * 1. CLI reset via omniroute-reset-password command
 * 2. Manual database reset instructions
 */

import Link from "next/link";
import { Card } from "@/shared/components";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">{t(">resetPassword</")}</h1>
          <p className="text-text-muted">{t("resetDescription")}</p>
        </div>

        {/* Method 1: CLI Reset */}
        <Card className="mb-4">
          <div className="flex items-start gap-4 p-2">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">Method 1: CLI Reset</h2>
              <p className="text-sm text-text-muted mb-3">
                Run the following command on the server where OmniRoute is running:
              </p>
              <div className="bg-black/30 rounded-lg p-3 mb-3 font-mono text-sm text-green-400 border border-white/5">
                <code>npx omniroute reset-password</code>
              </div>
              <p className="text-xs text-text-muted">
                This will prompt you to set a new password. The server must be stopped first.
              </p>
            </div>
          </div>
        </Card>

        {/* Method 2: Database Reset */}
        <Card className="mb-6">
          <div className="flex items-start gap-4 p-2">
            <div className="flex items-center justify-center size-10 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">database</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">Method 2: Manual Reset</h2>
              <p className="text-sm text-text-muted mb-3">
                Delete the password from the database and set a new one on startup:
              </p>
              <ol className="text-sm text-text-muted space-y-2 list-decimal list-inside mb-3">
                <li>{t("stopServer")}</li>
                <li>
                  Set a new password in your{" "}
                  <code className="bg-black/30 px-1 rounded text-text-main">.env</code> file:
                  <div className="bg-black/30 rounded-lg p-2 mt-1 font-mono text-xs text-green-400 border border-white/5">
                    INITIAL_PASSWORD=your_new_password
                  </div>
                </li>
                <li>
                  Delete{" "}
                  <code className="bg-black/30 px-1 rounded text-text-main">
                    data/settings.json
                  </code>{" "}
                  (or remove the{" "}
                  <code className="bg-black/30 px-1 rounded text-text-main">passwordHash</code>{" "}
                  field)
                </li>
                <li>Restart the server — it will use the new password</li>
              </ol>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
