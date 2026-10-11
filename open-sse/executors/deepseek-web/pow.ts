import { z } from "zod";

const challengeSchema = z.object({
  algorithm: z.string(),
  challenge: z.string(),
  salt: z.string(),
  signature: z.string(),
  difficulty: z.number().int().positive(),
  expire_at: z.number().int().nonnegative(),
  expire_after: z.number().optional(),
  target_path: z.string(),
});
export type PowChallenge = z.infer<typeof challengeSchema>;

export async function requestDeepSeekPowChallenge(options: {
  accessToken: string;
  headers: Record<string, string>;
  signal?: AbortSignal | null;
  targetPath: string;
}): Promise<PowChallenge> {
  const response = await fetch("https://chat.deepseek.com/api/v0/chat/create_pow_challenge", {
    method: "POST",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.accessToken}`,
    },
    body: JSON.stringify({ target_path: options.targetPath }),
    signal: options.signal ?? undefined,
  });
  if (!response.ok) throw new Error(`create_pow_challenge HTTP ${response.status}`);
  const json = await response.json();
  const challenge = json?.data?.biz_data?.challenge ?? json?.biz_data?.challenge;
  const result = challengeSchema.safeParse({ ...challenge, target_path: options.targetPath });
  if (!result.success) throw new Error("Invalid DeepSeek PoW challenge");
  return result.data;
}
