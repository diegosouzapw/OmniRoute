export const RETIRED_MICROSOFT_DESIGNER_WEB_PROVIDER_IDS: ReadonlySet<string> = new Set([
  "microsoft-designer-web",
  "msdesigner",
]);

export const MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE =
  "Provider has been retired from OmniRoute runtime.";

function normalizeProviderId(providerId: unknown): string {
  return typeof providerId === "string" ? providerId.trim().toLowerCase() : "";
}

export function isMicrosoftDesignerWebRetiredProviderId(providerId: unknown): boolean {
  return RETIRED_MICROSOFT_DESIGNER_WEB_PROVIDER_IDS.has(normalizeProviderId(providerId));
}

export function assertMicrosoftDesignerWebProviderAvailable(providerId: unknown): void {
  if (!isMicrosoftDesignerWebRetiredProviderId(providerId)) return;

  const error = new Error(MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE);
  (error as Error & { status?: number }).status = 410;
  throw error;
}

export function isMicrosoftDesignerWebProviderRetiredError(
  error: unknown
): error is Error & { status: 410 } {
  return (
    error instanceof Error &&
    (error as Error & { status?: number }).status === 410 &&
    error.message === MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE
  );
}
