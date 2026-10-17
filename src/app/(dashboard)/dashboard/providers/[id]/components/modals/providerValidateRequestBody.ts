/**
 * Body for POST /api/providers/validate, shared by the add and edit connection modals
 * (their "Check" button and their save-time re-validation sent the same object four times).
 */
type ValidateFormFields = {
  validationModelId?: string;
  customUserAgent: string;
  baseUrl: string;
  region: string;
  awsAccessKeyId: string;
  awsSessionToken: string;
  cx: string;
  runtimeKey: string;
  tunnelId: string;
  connectorName: string;
  commandCodeZdrEnabled?: boolean;
};

export function buildProviderValidateRequestBody(options: {
  provider: string;
  apiKey: string;
  formData: ValidateFormFields;
  isAwsPolly: boolean;
  showsRegion: boolean;
  defaultRegion: string;
  isChatGptWebCodex: boolean;
}) {
  const { provider, apiKey, formData, isAwsPolly, showsRegion, defaultRegion } = options;
  const webCodex = options.isChatGptWebCodex;
  return {
    provider,
    apiKey,
    validationModelId: formData.validationModelId || undefined,
    customUserAgent: formData.customUserAgent.trim() || undefined,
    baseUrl: formData.baseUrl.trim() || undefined,
    region: isAwsPolly
      ? formData.region.trim() || "us-east-1"
      : showsRegion
        ? formData.region.trim() || defaultRegion
        : undefined,
    accessKeyId: isAwsPolly ? formData.awsAccessKeyId.trim() || undefined : undefined,
    sessionToken: isAwsPolly ? formData.awsSessionToken.trim() || undefined : undefined,
    cx: formData.cx.trim() || undefined,
    runtimeKey: webCodex ? formData.runtimeKey.trim() || undefined : undefined,
    tunnelId: webCodex ? formData.tunnelId.trim() || undefined : undefined,
    connectorName: webCodex ? formData.connectorName.trim() || undefined : undefined,
    zdrEnabled:
      provider === "command-code" && formData.commandCodeZdrEnabled === true ? true : undefined,
  };
}
