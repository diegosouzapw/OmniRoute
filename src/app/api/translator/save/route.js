import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { file, content } = await request.json();

    if (!file || content === undefined) {
      return NextResponse.json(
        { success: false, error: "File and content required" },
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

    // Create directory if not exists
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const filePath = path.join(logsDir, file);
    fs.writeFileSync(filePath, content, "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
