import { ollamaModels } from "@omniroute/open-sse/config/ollamaModels.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function GET() {
  return new Response(JSON.stringify(ollamaModels), {
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
