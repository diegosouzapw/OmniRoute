"use client";

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

type GheConfigStepProps = {
  gheUrl: string;
  setGheUrl: (value: string) => void;
  /** Rendered inline below the form; `unknown` is not a valid ReactNode. */
  error?: string | null;
  setError: (value: string) => void;
  startOAuthFlow: () => void;
};

/** GHE Copilot: collect the GitHub Enterprise base URL before starting the OAuth flow. */
export default function GheConfigStep({
  gheUrl,
  setGheUrl,
  error,
  setError,
  startOAuthFlow,
}: GheConfigStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-text-muted">
        Enter the base URL of your GitHub Enterprise instance (e.g.{" "}
        <code className="font-mono">https://ghe.yourcompany.com</code>).
      </p>
      <Input
        value={gheUrl}
        onChange={(e) => setGheUrl(e.target.value)}
        placeholder="https://ghe.yourcompany.com"
        label="GitHub Enterprise URL"
        type="url"
      />
      <Button
        onClick={() => {
          if (!gheUrl.trim()) {
            setError("GitHub Enterprise URL is required");
            return;
          }
          startOAuthFlow();
        }}
        fullWidth
        disabled={!gheUrl.trim()}
      >
        Connect
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
