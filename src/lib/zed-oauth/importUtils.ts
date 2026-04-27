import { AI_PROVIDERS } from "@/shared/constants/providers";
import type { ZedCredential } from "./keychain-reader";

export interface PartitionedZedCredentials {
  importable: ZedCredential[];
  skipped: ZedCredential[];
  duplicatesDropped: number;
}

function isSupportedZedProvider(provider: string): boolean {
  return (
    typeof provider === "string" &&
    provider.length > 0 &&
    provider !== "unknown" &&
    !!AI_PROVIDERS[provider]
  );
}

export function partitionZedCredentials(credentials: ZedCredential[]): PartitionedZedCredentials {
  const importable: ZedCredential[] = [];
  const skipped: ZedCredential[] = [];
  const seen = new Set<string>();
  let duplicatesDropped = 0;

  for (const credential of credentials) {
    if (!credential?.token || !isSupportedZedProvider(credential.provider)) {
      skipped.push(credential);
      continue;
    }

    const dedupeKey = `${credential.provider}:${credential.token}`;
    if (seen.has(dedupeKey)) {
      duplicatesDropped += 1;
      continue;
    }

    seen.add(dedupeKey);
    importable.push(credential);
  }

  return {
    importable,
    skipped,
    duplicatesDropped,
  };
}
