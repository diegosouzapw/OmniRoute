import { NextResponse } from "next/server";
import { getModelAliases, setModelAlias, getProviderConnections } from "@/models";
import { AI_MODELS } from "@/shared/constants/config";

// GET /api/models - Get models with aliases (only from active providers by default)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    const modelAliases = await getModelAliases();

    // Get active provider connections to filter available models
    let activeProviders: Set<string> | null = null;
    if (!showAll) {
      try {
        const connections = await getProviderConnections();
        const active = connections.filter((c: any) => c.isActive !== false);
        activeProviders = new Set(active.map((c: any) => c.provider));
      } catch {
        // If DB unavailable, show all models
      }
    }

    const models = AI_MODELS.map((m: any) => {
      const fullModel = `${m.provider}/${m.model}`;
      const available = !activeProviders || activeProviders.has(m.provider);
      return {
        ...m,
        fullModel,
        alias: modelAliases[fullModel] || m.model,
        available,
      };
    }).filter((m: any) => showAll || m.available);

    return NextResponse.json({ models });
  } catch (error) {
    console.log("Error fetching models:", error);
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
  }
}

// PUT /api/models - Update model alias
export async function PUT(request) {
  try {
    const body = await request.json();
    const { model, alias } = body;

    if (!model || !alias) {
      return NextResponse.json({ error: "Model and alias required" }, { status: 400 });
    }

    const modelAliases = await getModelAliases();

    // Check if alias already exists for different model
    const existingModel = Object.entries(modelAliases).find(
      ([key, val]) => val === alias && key !== model
    );

    if (existingModel) {
      return NextResponse.json({ error: "Alias already in use" }, { status: 400 });
    }

    // Update alias
    await setModelAlias(model, alias);

    return NextResponse.json({ success: true, model, alias });
  } catch (error) {
    console.log("Error updating alias:", error);
    return NextResponse.json({ error: "Failed to update alias" }, { status: 500 });
  }
}
