import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";

const OLLAMA_COMPAT_VERSION = "0.6.4";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET() {
  return Response.json(
    {
      version: OLLAMA_COMPAT_VERSION,
    },
    {
      headers: {
        ...CORS_HEADERS,
      },
    }
  );
}