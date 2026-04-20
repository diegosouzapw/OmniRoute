import fs from "fs";

let content = fs.readFileSync("tests/unit/token-refresh-service.test.ts", "utf-8");

// Fix jsonResponse
content = content.replace(
  /function jsonResponse\(body, status = 200\)/g,
  "function jsonResponse(body: any, status = 200)"
);

// Fix textResponse
content = content.replace(
  /function textResponse\(text, status = 400\)/g,
  "function textResponse(text: any, status = 400)"
);

// Fix calls = []
content = content.replace(/const calls = \[\];/g, "const calls: any[] = [];");

// Fix result is possibly null
content = content.replace(/result\.accessToken/g, "result?.accessToken");
content = content.replace(/result\.refreshToken/g, "result?.refreshToken");
content = content.replace(/result\.expiresIn/g, "result?.expiresIn");

fs.writeFileSync("tests/unit/token-refresh-service.test.ts", content);

let claudeContent = fs.readFileSync("tests/unit/translator-claude-to-gemini.test.ts", "utf-8");
claudeContent = claudeContent.replace(/result\.tools/g, "(result as any).tools");
claudeContent = claudeContent.replace(/result\._toolNameMap/g, "(result as any)._toolNameMap");
claudeContent = claudeContent.replace(/result\[0\]/g, "(result as any)[0]");
fs.writeFileSync("tests/unit/translator-claude-to-gemini.test.ts", claudeContent);

let openaiContent = fs.readFileSync("tests/unit/translator-openai-to-gemini.test.ts", "utf-8");
openaiContent = openaiContent.replace(
  /result\.systemInstruction/g,
  "(result as any).systemInstruction"
);
openaiContent = openaiContent.replace(/result\.tools/g, "(result as any).tools");
openaiContent = openaiContent.replace(
  /result\.generationConfig/g,
  "(result as any).generationConfig"
);
openaiContent = openaiContent.replace(/result\._toolNameMap/g, "(result as any)._toolNameMap");
openaiContent = openaiContent.replace(
  /result\.request\.systemInstruction/g,
  "(result as any).request?.systemInstruction"
);
openaiContent = openaiContent.replace(/result\.request\.tools/g, "(result as any).request?.tools");
openaiContent = openaiContent.replace(/null\)/g, "null as any)");
fs.writeFileSync("tests/unit/translator-openai-to-gemini.test.ts", openaiContent);

console.log("Fixed typings");
