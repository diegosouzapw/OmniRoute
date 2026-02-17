import { NextResponse } from "next/server";
import {
  setSystemPromptConfig,
  getSystemPromptConfig,
} from "@omniroute/open-sse/services/systemPrompt.ts";
import { updateSettings } from "@/lib/localDb";

export async function GET() {
  try {
    return NextResponse.json(getSystemPromptConfig());
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    if (body.prompt !== undefined && typeof body.prompt !== "string") {
      return NextResponse.json({ error: "prompt must be a string" }, { status: 400 });
    }

    setSystemPromptConfig(body);
    await updateSettings({ systemPrompt: body });

    return NextResponse.json(getSystemPromptConfig());
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
