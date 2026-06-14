// src/lib/playground/promptImprover.ts
import { z } from "zod";

export const ImprovePromptRequestSchema = z
  .object({
    /** Conteúdo atual a melhorar; pelo menos um dos dois deve ser não-vazio. */
    system: z.string().max(50_000).optional(),
    prompt: z.string().max(50_000).optional(),
    /** Modelo configurado no painel Config — escolha do usuário (D8). */
    model: z.string().min(1),
    /** Tom: "concise" (padrão) ou "detailed" (mais verboso). */
    tone: z.enum(["concise", "detailed"]).default("concise"),
  })
  .refine((d) => Boolean(d.system?.trim() || d.prompt?.trim()), {
    message: "At least one of `system` or `prompt` must be non-empty",
    path: ["system"],
  });

export type ImprovePromptRequest = z.infer<typeof ImprovePromptRequestSchema>;

export interface ImprovePromptResult {
  /** Versões melhoradas (apenas as fornecidas no request retornam). */
  improvedSystem?: string;
  improvedPrompt?: string;
  /** Tokens consumidos no call de melhoria (do usage). */
  tokensIn: number;
  tokensOut: number;
}

/**
 * Meta-prompt fixado (D8). NÃO alterar sem aprovação do orquestrador.
 * Inspirado em Anthropic Console Prompt Improver.
 */
export const META_SYSTEM_PROMPT = `\
You are an expert prompt engineer. Rewrite the user-supplied prompts to be:
- Clear, specific, and unambiguous
- Free of redundancy and filler
- Structured (numbered steps, bullets) only when it materially helps the model
- Preserving the user's original intent — never invent new constraints

Return ONLY the rewritten text. No explanations, no markdown wrappers.
If you receive both a system message and a user prompt, output them on separate
lines prefixed with "<<SYSTEM>>" and "<<PROMPT>>" respectively.`;

/**
 * Monta o body de /v1/chat/completions para o improve call.
 * Exportado para reuso em testes + na rota.
 */
export function buildImproveChatBody(req: ImprovePromptRequest): {
  model: string;
  messages: Array<{ role: "system" | "user"; content: string }>;
  temperature: number;
  max_tokens: number;
  stream: false;
} {
  const userContent: string[] = [];
  if (req.system?.trim()) userContent.push(`<<SYSTEM>>\n${req.system}`);
  if (req.prompt?.trim()) userContent.push(`<<PROMPT>>\n${req.prompt}`);
  const tonePrefix =
    req.tone === "detailed"
      ? "Be detailed and explicit in the rewrite.\n\n"
      : "Be concise and direct.\n\n";

  return {
    model: req.model,
    messages: [
      { role: "system", content: META_SYSTEM_PROMPT },
      { role: "user", content: tonePrefix + userContent.join("\n\n") },
    ],
    temperature: 0.3,
    max_tokens: 2048,
    stream: false,
  };
}

/**
 * Parse da resposta do meta-LLM em improvedSystem/improvedPrompt.
 * Retorna ambos quando ambos foram enviados; senão retorna só o presente.
 *
 * Edge cases:
 * - Se raw não contém marcadores <<SYSTEM>> ou <<PROMPT>>:
 *   - Se hadSystem e !hadPrompt → trata todo o conteúdo como improvedSystem
 *   - Se !hadSystem e hadPrompt → trata todo o conteúdo como improvedPrompt
 *   - Se hadSystem e hadPrompt → trata todo o conteúdo como improvedPrompt (fallback)
 * - Whitespace é trimado antes de retornar
 */
export function parseImprovedContent(
  raw: string,
  hadSystem: boolean,
  hadPrompt: boolean,
): { improvedSystem?: string; improvedPrompt?: string } {
  const result: { improvedSystem?: string; improvedPrompt?: string } = {};

  const systemMarker = "<<SYSTEM>>";
  const promptMarker = "<<PROMPT>>";

  const hasSystemMarker = raw.includes(systemMarker);
  const hasPromptMarker = raw.includes(promptMarker);

  if (hasSystemMarker || hasPromptMarker) {
    // Parse by markers
    if (hasSystemMarker && hasPromptMarker) {
      const sysStart = raw.indexOf(systemMarker) + systemMarker.length;
      const promptStart = raw.indexOf(promptMarker);

      let sysContent: string;
      if (sysStart < promptStart) {
        sysContent = raw.substring(sysStart, promptStart).trim();
      } else {
        sysContent = raw.substring(sysStart).trim();
      }

      const promptContentStart = promptStart + promptMarker.length;
      let promptContent: string;
      if (hasSystemMarker && raw.indexOf(systemMarker) > promptStart) {
        promptContent = raw.substring(promptContentStart, raw.indexOf(systemMarker)).trim();
      } else {
        promptContent = raw.substring(promptContentStart).trim();
      }

      if (hadSystem && sysContent) result.improvedSystem = sysContent;
      if (hadPrompt && promptContent) result.improvedPrompt = promptContent;
    } else if (hasSystemMarker) {
      const sysStart = raw.indexOf(systemMarker) + systemMarker.length;
      const sysContent = raw.substring(sysStart).trim();
      if (hadSystem && sysContent) result.improvedSystem = sysContent;
    } else {
      // Only <<PROMPT>> marker
      const promptStart = raw.indexOf(promptMarker) + promptMarker.length;
      const promptContent = raw.substring(promptStart).trim();
      if (hadPrompt && promptContent) result.improvedPrompt = promptContent;
    }
  } else {
    // No markers — assign to whichever field was provided
    const trimmed = raw.trim();
    if (hadSystem && !hadPrompt) {
      if (trimmed) result.improvedSystem = trimmed;
    } else if (!hadSystem && hadPrompt) {
      if (trimmed) result.improvedPrompt = trimmed;
    } else if (hadSystem && hadPrompt) {
      // Fallback: assign to prompt
      if (trimmed) result.improvedPrompt = trimmed;
    }
  }

  return result;
}
