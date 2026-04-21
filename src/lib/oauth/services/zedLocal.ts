import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const ZED_SERVER_URL = "https://zed.dev";

function normalizeNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

export function extractZedAccountFromSecurityText(text: string): string | null {
  for (const line of text.split(/\r?\n/)) {
    const marker = '"acct"<blob>="';
    const index = line.indexOf(marker);
    if (index === -1) continue;
    const rest = line.slice(index + marker.length);
    const closing = rest.indexOf('"');
    if (closing === -1) continue;
    const account = normalizeNonEmptyString(rest.slice(0, closing));
    if (account) return account;
  }
  return null;
}

export type ZedLocalSession = {
  userId: string;
  accessToken: string;
};

export async function readZedLocalSession(): Promise<ZedLocalSession | null> {
  if (process.platform !== "darwin") {
    return null;
  }

  const meta = await execFileAsync("security", ["find-internet-password", "-s", ZED_SERVER_URL], {
    encoding: "utf8",
  }).catch((error: unknown) => {
    const stderr =
      error && typeof error === "object" && "stderr" in error ? String(error.stderr || "") : "";
    if (stderr.includes("could not be found")) {
      return null;
    }
    throw new Error(
      `Failed to read Zed Keychain metadata: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  });

  if (!meta) {
    return null;
  }

  const password = await execFileAsync(
    "security",
    ["find-internet-password", "-s", ZED_SERVER_URL, "-w"],
    {
      encoding: "utf8",
    }
  ).catch((error: unknown) => {
    throw new Error(
      `Failed to read Zed Keychain password: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  });

  const metaText = `${meta.stdout || ""}\n${meta.stderr || ""}`;
  const userId = extractZedAccountFromSecurityText(metaText);
  const accessToken = normalizeNonEmptyString(password.stdout);

  if (!userId) {
    throw new Error("Failed to parse Zed account from Keychain metadata");
  }
  if (!accessToken) {
    throw new Error("Zed Keychain returned an empty access token");
  }

  return {
    userId,
    accessToken,
  };
}
