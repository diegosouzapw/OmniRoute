#!/usr/bin/env node

/**
 * Test sending request from converted file directly to provider
 * Usage:
 *   node testFromFile.js <file-path>
 *   node testFromFile.js data/claude-to-kiro/3_converted_request.json
 */

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log("");
  console.log("🧪 Test From File - Send converted request to provider");
  console.log("");
  console.log("Usage:");
  console.log("  node testFromFile.js <file-path>");
  console.log("");
  console.log("Examples:");
  console.log("  node testFromFile.js data/claude-to-kiro/3_converted_request.json");
  console.log("  node testFromFile.js ../logs/openai_codex_xxx/3_converted_request.json");
  console.log("");
  console.log("File format:");
  console.log("  {");
  console.log('    "url": "https://api.provider.com/...",');
  console.log('    "headers": { ... },');
  console.log('    "body": { ... }');
  console.log("  }");
  console.log("");
  process.exit(0);
}

const filePath = args[0];
const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);

if (!fs.existsSync(fullPath)) {
  console.error(`❌ File not found: ${fullPath}`);
  process.exit(1);
}

// Load request data
let data;
try {
  data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
} catch (err: any) {
  console.error(`❌ Failed to parse JSON: ${err.message}`);
  process.exit(1);
}

const { url, headers, body } = data;

if (!url || !headers || !body) {
  console.error("❌ Invalid file format. Expected: { url, headers, body }");
  process.exit(1);
}

// Display request info
console.log("\n🚀 Sending Request from File\n");
console.log(`📁 File: ${filePath}`);
console.log(`🌐 URL: ${url}`);
console.log(`📋 Headers:`);
Object.entries(headers).forEach(([k, v]) => {
  if (
    k.toLowerCase().includes("auth") ||
    k.toLowerCase().includes("key") ||
    k.toLowerCase().includes("bearer")
  ) {
    const str = String(v);
    if (str.length > 20) {
      console.log(`  ${k}: ${str.slice(0, 20)}...`);
    } else {
      console.log(`  ${k}: ${str}`);
    }
  } else {
    console.log(`  ${k}: ${v}`);
  }
});

console.log(`\n📊 Request Body:`);
console.log(`  Model: ${body.model || "N/A"}`);
console.log(`  Messages: ${body.messages?.length || 0}`);
console.log(`  Tools: ${body.tools?.length || 0}`);
console.log(`  Stream: ${body.stream || false}`);

// Send request
(async () => {
  try {
    console.log("\n🚀 Sending request...");

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    console.log(`\n📥 Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`\n❌ Error response:\n${errorText}`);
      process.exit(1);
    }

    const isStreaming =
      body.stream || response.headers.get("content-type")?.includes("text/event-stream");

    if (isStreaming) {
      console.log("\n📡 Streaming response...\n");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");
      const decoder = new TextDecoder();
      let chunkCount = 0;
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.trim()) {
            process.stdout.write(line + "\n");
            chunkCount++;
          }
        }
      }

      // Process any remaining data
      if (buffer.trim()) {
        process.stdout.write(buffer + "\n");
      }

      console.log(`\n\n✅ Received ${chunkCount} chunks`);
    } else {
      const responseData = (await response.json()) as any;
      console.log("\n📦 Response:");
      console.log(JSON.stringify(responseData, null, 2));
    }
  } catch (err: any) {
    console.error("\n❌ Request failed:", err.message);
    if (process.env.DEBUG) {
      console.error(err.stack);
    }
    process.exit(1);
  }
})();
