/**
 * Protocolos alternativos declarados por um provedor.
 *
 * Alguns upstreams publicam o mesmo catalogo em mais de um protocolo (ex.: Xiaomi
 * MiMo expoe /v1/chat/completions e /anthropic/v1/messages no mesmo host). Trocar
 * de protocolo troca URL, header de auth e headers extras — por isso a alternativa
 * carrega os tres, nao so a URL.
 *
 * A escolha vive na conexao, em providerSpecificData.targetFormat, e so vale se
 * casar com uma alternativa declarada: valor desconhecido cai no formato padrao,
 * nunca produz uma URL/auth orfas.
 */
import type { RegistryEntry } from "./shared.ts";

export interface AlternateFormat {
  format: string;
  baseUrl: string;
  chatPath?: string;
  authHeader?: string;
  headers?: Record<string, string>;
  urlSuffix?: string;
  /**
   * Monta a URL final quando o protocolo alternativo embute o modelo no path, e
   * nao apenas um sufixo fixo. O caso concreto e o protocolo Gemini, cuja rota e
   * `{base}/{model}:generateContent` (ou `:streamGenerateContent?alt=sse`) — algo
   * que `chatPath`/`urlSuffix` nao expressam, porque ambos sao constantes.
   *
   * Mesma assinatura do `urlBuilder` de RegistryEntry (base ja sem "/" final,
   * modelo e stream), de proposito: um gateway que fala Gemini como alternativa
   * reaproveita `buildGeminiGenerateContentUrl` de shared.ts — o mesmo builder que
   * o provedor Gemini nativo usa — em vez de reimplementar a rota.
   * Quando ausente, a URL continua sendo `baseUrl + chatPath + urlSuffix`.
   */
  urlBuilder?: (base: string, model: string, stream: boolean) => string;
  label: string;
}

export function resolveAlternateFormat(
  entry: RegistryEntry | null | undefined,
  providerSpecificData: unknown
): AlternateFormat | null {
  const alternates = entry?.alternateFormats;
  if (!alternates?.length) return null;
  const requested = (providerSpecificData as { targetFormat?: unknown } | null | undefined)
    ?.targetFormat;
  if (typeof requested !== "string" || !requested) return null;
  return alternates.find((alt) => alt.format === requested) ?? null;
}
