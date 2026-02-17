const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

/**
 * GET /v1 - Return models list (OpenAI compatible)
 */
export async function GET() {
  const models = [
    { id: "claude-sonnet-4-20250514", object: "model", owned_by: "anthropic" },
    { id: "claude-3-5-sonnet-20241022", object: "model", owned_by: "anthropic" },
    { id: "gpt-4o", object: "model", owned_by: "openai" },
    { id: "gemini-2.5-pro", object: "model", owned_by: "google" },
  ];

  return new Response(
    JSON.stringify({
      object: "list",
      data: models,
    }),
    {
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
}
