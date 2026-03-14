/**
 * Clipboard utility with HTTP/HTTPS fallback.
 * navigator.clipboard.writeText() requires HTTPS (secure context).
 * For HTTP deployments, falls back to execCommand('copy').
 */

/**
 * Copy text to clipboard with automatic HTTPS/HTTP fallback.
 * Works in both secure (HTTPS) and non-secure (HTTP) contexts.
 * @param text - Text to copy to clipboard
 * @returns true if copy succeeded, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Method 1: Clipboard API (requires HTTPS / secure context)
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof window !== "undefined" &&
    window.isSecureContext
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to execCommand fallback
    }
  }

  // Method 2: Legacy execCommand fallback (works on HTTP)
  if (typeof document !== "undefined" && document.body) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0;pointer-events:none;";
    let appended = false;

    try {
      document.body.appendChild(textArea);
      appended = true;
      textArea.focus();
      textArea.select();
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      if (appended && document.body.contains(textArea)) {
        document.body.removeChild(textArea);
      }
    }
  }

  return false;
}
