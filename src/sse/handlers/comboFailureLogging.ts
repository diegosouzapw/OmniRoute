export async function getComboFailureLogError(
  response: Response,
  comboName: string
): Promise<string> {
  const fallback = `[${response.status}] Combo "${comboName}" failed`;
  try {
    const body = await response.clone().json();
    const message = body?.error?.message;
    return typeof message === "string" && message.trim()
      ? `[${response.status}] ${message.trim()}`
      : fallback;
  } catch {
    return fallback;
  }
}
