import { NextResponse } from "next/server";
import { validateApiKey, getModelAliases } from "@/models";

// Resolve model alias to provider/model
export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401 });
    }

    const apiKey = authHeader.slice(7);

    const body = await request.json();
    const { alias } = body;

    if (!alias) {
      return NextResponse.json({ error: "Missing alias" }, { status: 400 });
    }

    // Validate API key
    const isValid = await validateApiKey(apiKey);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Get model aliases
    const modelAliases = await getModelAliases();
    const resolved = modelAliases[alias];

    if (resolved) {
      // Parse provider/model
      const firstSlash = resolved.indexOf("/");
      if (firstSlash > 0) {
        return NextResponse.json({
          alias,
          provider: resolved.slice(0, firstSlash),
          model: resolved.slice(firstSlash + 1),
        });
      }
    }

    // Not found
    return NextResponse.json({ error: "Alias not found" }, { status: 404 });
  } catch (error) {
    console.log("Model resolve error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
