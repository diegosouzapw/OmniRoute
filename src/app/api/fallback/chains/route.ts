import { NextResponse } from "next/server";
import {
  getAllFallbackChains,
  registerFallback,
  removeFallback,
} from "@/domain/fallbackPolicy";

export async function GET() {
  try {
    const chains = getAllFallbackChains();
    return NextResponse.json(chains);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { model, chain } = await request.json();
    if (!model || !Array.isArray(chain)) {
      return NextResponse.json(
        { error: "model (string) and chain (array of {provider, priority?, enabled?}) are required" },
        { status: 400 }
      );
    }
    registerFallback(model, chain);
    return NextResponse.json({ success: true, model });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { model } = await request.json();
    if (!model) {
      return NextResponse.json({ error: "model is required" }, { status: 400 });
    }
    const removed = removeFallback(model);
    return NextResponse.json({ success: true, removed });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
