import { NextResponse } from "next/server";
import { pluginManager } from "@/lib/plugins/manager";

export async function GET() {
  try {
    const extensions = pluginManager.getUiExtensions();
    return NextResponse.json(extensions);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch UI extensions" },
      { status: 500 }
    );
  }
}