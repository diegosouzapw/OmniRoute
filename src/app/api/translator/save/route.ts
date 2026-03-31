import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { translatorSaveSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(translatorSaveSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }
    const { file, content } = validation.data;

    // Security: only allow specific filenames
    const allowedFiles = [
      "1_req_client.json",
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
    return NextResponse.json({ success: false, error: "Failed to save file" }, { status: 500 });
  }
}
