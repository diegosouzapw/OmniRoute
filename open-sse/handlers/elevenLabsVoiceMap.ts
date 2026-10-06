/**
 * OpenAI-compat `voice` name -> ElevenLabs `voice_id` resolution.
 *
 * ElevenLabs' TTS endpoint takes a real `voice_id` (a ~20-char alphanumeric token, e.g.
 * `21m00Tcm4TlvDq8ikWAM`) as a URL path segment. OpenAI TTS stock voice names (`alloy`,
 * `echo`, ...) and ElevenLabs human-readable display names (`Rachel`) are not valid
 * `voice_id`s on their own — forwarding them unmapped 404s upstream. This module resolves
 * a client-supplied `voice` value to a real `voice_id`, or reports that it cannot.
 *
 * See #10589.
 */

// OpenAI TTS stock voice names -> real ElevenLabs voice_id (premade voices, widely
// available across ElevenLabs accounts/plans).
const OPENAI_VOICE_TO_ELEVENLABS_ID: Record<string, string> = {
  alloy: "21m00Tcm4TlvDq8ikWAM", // Rachel
  echo: "pNInz6obpgDQGcFmaJgB", // Adam
  fable: "nPczCjzI2devNBz1zQrb", // Brian
  onyx: "ErXwobaYiN019PkySvjV", // Antoni
  nova: "EXAVITQu4vr4xnSDxMaL", // Bella
  shimmer: "ThT5KcBeYPX3keUQqHPh", // Dorothy
};

// A handful of well-known ElevenLabs display names -> voice_id, matched case-insensitively,
// so a request like `voice: "Rachel"` (a real display name but not a raw voice_id) resolves
// instead of 404-ing upstream.
const ELEVENLABS_DISPLAY_NAME_TO_ID: Record<string, string> = {
  rachel: "21m00Tcm4TlvDq8ikWAM",
  adam: "pNInz6obpgDQGcFmaJgB",
  brian: "nPczCjzI2devNBz1zQrb",
  antoni: "ErXwobaYiN019PkySvjV",
  bella: "EXAVITQu4vr4xnSDxMaL",
  dorothy: "ThT5KcBeYPX3keUQqHPh",
};

export const ELEVENLABS_DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel

// A real ElevenLabs voice_id is a ~20-char alphanumeric token (e.g. 21m00Tcm4TlvDq8ikWAM).
const ELEVENLABS_VOICE_ID_PATTERN = /^[A-Za-z0-9]{16,32}$/;

/**
 * Resolve an OpenAI-compat `voice` value (or ElevenLabs display name) to a real
 * ElevenLabs voice_id. Returns null when the value is present but cannot be
 * resolved to a known alias and does not itself look like a raw voice_id.
 */
export function resolveElevenLabsVoiceId(voice: unknown): string | null {
  if (voice === undefined || voice === null || voice === "") {
    return ELEVENLABS_DEFAULT_VOICE_ID;
  }
  if (typeof voice !== "string") {
    return null;
  }
  const trimmed = voice.trim();
  if (!trimmed) {
    return ELEVENLABS_DEFAULT_VOICE_ID;
  }
  const lower = trimmed.toLowerCase();
  if (OPENAI_VOICE_TO_ELEVENLABS_ID[lower]) {
    return OPENAI_VOICE_TO_ELEVENLABS_ID[lower];
  }
  if (ELEVENLABS_DISPLAY_NAME_TO_ID[lower]) {
    return ELEVENLABS_DISPLAY_NAME_TO_ID[lower];
  }
  if (ELEVENLABS_VOICE_ID_PATTERN.test(trimmed)) {
    return trimmed;
  }
  return null;
}
