type CcCompatibleRequestDefaultsForm = {
  ccCompatibleContext1m: boolean;
  ccCompatibleRedactThinking: boolean;
};

const CC_COMPATIBLE_BOOLEAN_DEFAULTS = [
  ["context1m", "ccCompatibleContext1m"],
  ["redactThinking", "ccCompatibleRedactThinking"],
] as const;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function getCcCompatibleRequestDefaults(
  formData: CcCompatibleRequestDefaultsForm
): Record<string, true> | undefined {
  const defaults: Record<string, true> = {};
  for (const [requestKey, formKey] of CC_COMPATIBLE_BOOLEAN_DEFAULTS) {
    if (formData[formKey]) defaults[requestKey] = true;
  }
  return Object.keys(defaults).length > 0 ? defaults : undefined;
}

export function assignCcCompatibleRequestDefaults(
  target: Record<string, unknown>,
  formData: CcCompatibleRequestDefaultsForm
): void {
  const requestDefaults = getCcCompatibleRequestDefaults(formData);
  if (requestDefaults) target.requestDefaults = requestDefaults;
}

export function mergeCcCompatibleRequestDefaults(
  existing: unknown,
  formData: CcCompatibleRequestDefaultsForm
): Record<string, unknown> | undefined {
  const requestDefaults = { ...asRecord(existing) };
  for (const [requestKey, formKey] of CC_COMPATIBLE_BOOLEAN_DEFAULTS) {
    if (formData[formKey]) requestDefaults[requestKey] = true;
    else delete requestDefaults[requestKey];
  }
  return Object.keys(requestDefaults).length > 0 ? requestDefaults : undefined;
}
