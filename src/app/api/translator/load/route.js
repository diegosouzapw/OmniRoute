import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File parameter required" },
        { status: 400 }
      );
    }

    // Security: only allow specific filenames
    const allowedFiles = [
      "1_req_client.json",
      "2_req_source.json",
      "3_req_openai.json",
      "4_req_target.json",
      "5_res_provider.txt",
    ];

    if (!allowedFiles.includes(file)) {
      return NextResponse.json({ success: false, error: "Invalid file name" }, { status: 400 });
    }

    const logsDir = path.join(process.cwd(), "logs", "translator");
    const filePath = path.join(logsDir, file);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "File not found" }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, "utf-8");

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Error loading file:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
