import fs from "fs";
import { execSync } from "child_process";
import path from "path";

const projectRoot = process.env.PROJECT_ROOT || process.cwd();

const filesToCheckoutOurs = [
  ".source/browser.ts",
  ".source/server.ts",
  "package-lock.json",
  "electron/package-lock.json",
  "src/app/(dashboard)/dashboard/providers/[id]/page.tsx",
  "src/app/(dashboard)/dashboard/providers/components/ProviderCard.tsx",
  "src/lib/db/contextHandoffs.ts",
  "src/app/api/keys/groups/[id]/keys/route.ts",
  "src/app/api/keys/groups/[id]/permissions/route.ts",
  "src/app/api/keys/groups/[id]/route.ts",
  "src/app/api/keys/groups/route.ts",
  "src/app/api/middleware/hooks/[name]/route.ts",
  "src/app/api/middleware/hooks/route.ts",
  "src/app/api/relay/tokens/[id]/route.ts",
  "src/app/api/relay/tokens/route.ts",
  "src/app/api/playground/simulate-route/route.ts",
];

function runCmd(cmd) {
  console.log(`Running: ${cmd}`);
  return execSync(cmd, { cwd: projectRoot, encoding: "utf-8" });
}

async function main() {
  // 1. Checkout ours for the files where HEAD is the preferred up-to-date state
  for (const file of filesToCheckoutOurs) {
    try {
      runCmd(`git checkout --ours "${file}"`);
      runCmd(`git add "${file}"`);
    } catch (err) {
      console.error(`Failed to checkout --ours for ${file}:`, err.message);
    }
  }

  // 2. Resolve .dockerignore (keep release/v3.8.4 doc rules)
  try {
    runCmd("git checkout --theirs .dockerignore");
    runCmd("git add .dockerignore");
  } catch (err) {
    console.error("Failed to resolve .dockerignore:", err.message);
  }

  // 3. Resolve docs/reference/ENVIRONMENT.md (keep release/v3.8.4 table formatting)
  try {
    runCmd("git checkout --theirs docs/reference/ENVIRONMENT.md");
    runCmd("git add docs/reference/ENVIRONMENT.md");
  } catch (err) {
    console.error("Failed to resolve docs/reference/ENVIRONMENT.md:", err.message);
  }

  // 4. Resolve open-sse/executors/index.ts (keep both ClaudeWebExecutor and InnerAiExecutor)
  const execIndexFile = path.join(projectRoot, "open-sse/executors/index.ts");
  if (fs.existsSync(execIndexFile)) {
    let content = fs.readFileSync(execIndexFile, "utf-8");

    // Resolve imports conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\nimport \{ ClaudeWebExecutor \} from "\.\/claude-web\.ts";\r?\n=======\r?\nimport \{ InnerAiExecutor \} from "\.\/inner-ai\.ts";\r?\n>>>>>>> release\/v3\.8\.4/g,
      'import { ClaudeWebExecutor } from "./claude-web.ts";\nimport { InnerAiExecutor } from "./inner-ai.ts";'
    );

    // Resolve executor registration conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+"claude-web": new ClaudeWebExecutor\(\),\r?\n\s+"cw-web": new ClaudeWebExecutor\(\), \/\/ Alias\r?\n=======\r?\n\s+"inner-ai": new InnerAiExecutor\(\),\r?\n\s+"in-ai": new InnerAiExecutor\(\), \/\/ Alias\r?\n>>>>>>> release\/v3\.8\.4/g,
      '  "claude-web": new ClaudeWebExecutor(),\n  "cw-web": new ClaudeWebExecutor(), // Alias\n  "inner-ai": new InnerAiExecutor(),\n  "in-ai": new InnerAiExecutor(), // Alias'
    );

    fs.writeFileSync(execIndexFile, content);
    runCmd("git add open-sse/executors/index.ts");
  }

  // 7. Resolve src/app/api/providers/[id]/models/route.ts (combine imports)
  const modelsRoute = path.join(projectRoot, "src/app/api/providers/[id]/models/route.ts");
  if (fs.existsSync(modelsRoute)) {
    let content = fs.readFileSync(modelsRoute, "utf-8");
    content = content.replace(
      /<<<<<<< HEAD\r?\n=======\r?\nimport \{ sanitizeErrorMessage \} from "@omniroute\/open-sse\/utils\/error";\r?\nimport \{ getStaticQoderModels \} from "@omniroute\/open-sse\/services\/qoderCli\.ts";\r?\n>>>>>>> release\/v3\.8\.4/g,
      'import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";\nimport { getStaticQoderModels } from "@omniroute/open-sse/services/qoderCli.ts";'
    );
    fs.writeFileSync(modelsRoute, content);
    runCmd("git add src/app/api/providers/[id]/models/route.ts");
  }

  // 8. Resolve src/sse/handlers/chat.ts
  const sseChat = path.join(projectRoot, "src/sse/handlers/chat.ts");
  if (fs.existsSync(sseChat)) {
    let content = fs.readFileSync(sseChat, "utf-8");

    // Resolve comment / modelStr conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\n=======\r?\n\s+\/\/ `let` because the middleware-hook pipeline \(line ~319\) may reassign this\r?\n\s+\/\/ when a hook rewrites the target model\. Previously declared `const`, which\r?\n\s+\/\/ broke turbopack\/strict-mode builds \(PR #2670 regression\)\.\r?\n>>>>>>> release\/v3\.8\.4\r?\n\s+let modelStr = body\.model;/g,
      "  // `let` because the middleware-hook pipeline (line ~319) may reassign this\n  // when a hook rewrites the target model. Previously declared `const`, which\n  // broke turbopack/strict-mode builds (PR [PR #2670](file:///home/diegosouzapw/dev/proxys/OmniRoute/package.json#L2670) regression).\n  let modelStr = body.model;"
    );

    // Resolve trafficType / modelAbortSignal conflict (1st occurrence)
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+trafficType\?: "production" \| "shadow";\r?\n=======\r?\n\s+modelAbortSignal\?: AbortSignal \| null;\r?\n>>>>>>> release\/v3\.8\.4/g,
      '          trafficType?: "production" | "shadow";\n          modelAbortSignal?: AbortSignal | null;'
    );

    fs.writeFileSync(sseChat, content);
    runCmd("git add src/sse/handlers/chat.ts");
  }

  // 9. Resolve bin/cli/tray/autostart.mjs (keep execFileSync, combine ignoreFailure and systemd CI fallback)
  const autostart = path.join(projectRoot, "bin/cli/tray/autostart.mjs");
  if (fs.existsSync(autostart)) {
    let content = fs.readFileSync(autostart, "utf-8");

    // runUserSystemctl conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+\} catch \{\r?\n=======\r?\n\s+\} catch \(err\) \{\r?\n\s+if \(!ignoreFailure\) throw err;\r?\n>>>>>>> release\/v3\.8\.4/g,
      `  } catch (err) { \n    if (!ignoreFailure) throw err;`
    );

    // isSystemdServiceEnabled conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+return false;\r?\n=======\r?\n\s+\/\/ systemctl --user can't query the bus \(headless environments \/ CI runners\)\.\r?\n\s+\/\/ Treat the presence of the unit file as the source of truth, matching the\r?\n\s+\/\/ fallback used in enableLinux\(\) where unit-file existence counts as success\.\r?\n\s+return true;\r?\n>>>>>>> release\/v3\.8\.4/g,
      `    // systemctl --user can't query the bus (headless environments / CI runners).\n    // Treat the presence of the unit file as the source of truth, matching the\n    // fallback used in enableLinux() where unit-file existence counts as success.\n    return true;`
    );

    fs.writeFileSync(autostart, content);
    runCmd("git add bin/cli/tray/autostart.mjs");
  }

  // 10. Resolve electron/package.json
  const electronPkg = path.join(projectRoot, "electron/package.json");
  if (fs.existsSync(electronPkg)) {
    let content = fs.readFileSync(electronPkg, "utf-8");
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+"electron": "\^42\.2\.0",\r?\n\s+"electron-builder": "\^26\.11\.0"\r?\n=======\r?\n\s+"electron": "\^41\.2\.0",\r?\n\s+"electron-builder": "\^26\.11\.1"\r?\n>>>>>>> release\/v3\.8\.4/g,
      '    "electron": "^42.2.0",\n    "electron-builder": "^26.11.1"'
    );
    fs.writeFileSync(electronPkg, content);
    runCmd("git add electron/package.json");
  }

  // 11. Resolve .github/workflows/ci.yml
  const ciYaml = path.join(projectRoot, ".github/workflows/ci.yml");
  if (fs.existsSync(ciYaml)) {
    let content = fs.readFileSync(ciYaml, "utf-8");

    // Run c8 over shard title
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+rm -rf coverage-shard coverage-shard-report\r?\n=======\r?\n\s+# `--temp-directory` \(writable via NODE_V8_COVERAGE\) is what the merge\r?\n\s+# job reads with `c8 report --temp-directory \.\.\.`\. Using `--output-dir`\r?\n\s+# only produces the final json \*report\* and leaves the raw v8 files in\r?\n\s+# `coverage\/tmp`, so uploading `coverage-shard\/` was empty\. Pin the temp\r?\n\s+# dir so the raw coverage files live there and the artifact upload picks\r?\n\s+# them up regardless of `--test-force-exit` timing\.\r?\n>>>>>>> release\/v3\.8\.4/g,
      "          rm -rf coverage-shard coverage-shard-report\n          # `--temp-directory` (writable via NODE_V8_COVERAGE) is what the merge\n          # job reads with `c8 report --temp-directory ...`. Using `--output-dir`\n          # only produces the final json *report* and leaves the raw v8 files in\n          # `coverage/tmp`, so uploading `coverage-shard/` was empty. Pin the temp\n          # dir so the raw coverage files live there and the artifact upload picks\n          # them up regardless of `--test-force-exit` timing."
    );

    // c8 temp-directory arg
    content = content.replace(
      /<<<<<<< HEAD\r?\n=======\r?\n\s+--temp-directory=coverage-shard\r?\n>>>>>>> release\/v3\.8\.4/g,
      "            --temp-directory=coverage-shard"
    );

    fs.writeFileSync(ciYaml, content);
    runCmd("git add .github/workflows/ci.yml");
  }

  // 12. Resolve Dockerfile
  const dockerfile = path.join(projectRoot, "Dockerfile");
  if (fs.existsSync(dockerfile)) {
    let content = fs.readFileSync(dockerfile, "utf-8");

    // FROM node
    content = content.replace(
      /FROM node:26\.2\.0-trixie-slim AS builder\r?\nFROM node:24-trixie-slim AS builder/g,
      "FROM node:24-trixie-slim AS builder"
    );

    // apt-get cache mounts
    content = content.replace(
      /<<<<<<< HEAD\r?\nRUN --mount=type=cache,target=\/var\/cache\/apt,sharing=locked \\\r?\n\s+--mount=type=cache,target=\/var\/lib\/apt\/lists,sharing=locked \\\r?\n\s+apt-get update \\\r?\n=======\r?\nRUN apt-get update \\\r?\n>>>>>>> release\/v3\.8\.4/g,
      "RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \\\n  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \\\n  apt-get update \\"
    );

    // npm ci script ignore and reproducible build check
    content = content.replace(
      /<<<<<<< HEAD\r?\nRUN --mount=type=cache,target=\/root\/\.npm \\\r?\n\s+if \[ -f package-lock\.json \]; then \\\r?\n\s+npm ci --no-audit --no-fund --legacy-peer-deps; \\\r?\n\s+else \\\r?\n\s+npm install --no-audit --no-fund --legacy-peer-deps; \\\r?\n\s+fi\r?\n=======\r?\n# `--ignore-scripts` blocks the install\/postinstall hooks of dependencies,[\s\S]*?RUN npm ci --no-audit --no-fund --legacy-peer-deps --ignore-scripts\r?\n>>>>>>> release\/v3\.8\.4/g,
      `# --ignore-scripts blocks the install/postinstall hooks of dependencies,
# closing the supply-chain attack surface where a transitive dep can run
# arbitrary code at install time. OmniRoute's own postinstall (
# better-sqlite3 binary touchups, @swc/helpers copy) is only needed when
# a packaged app/node_modules is unpacked — inside the Docker builder we
# are doing a fresh native-platform install, so dropping the scripts is safe.
#
# We REQUIRE a committed package-lock.json so resolved dependency versions
# are reproducible.
RUN test -f package-lock.json \\
  || (echo "package-lock.json is required for reproducible Docker builds" >&2 && exit 1)
RUN --mount=type=cache,target=/root/.npm \\
  npm ci --no-audit --no-fund --legacy-peer-deps --ignore-scripts`
    );

    // npm global install
    content = content.replace(
      /<<<<<<< HEAD\r?\nRUN --mount=type=cache,target=\/root\/\.npm \\\r?\n\s+npm install -g --no-audit --no-fund @openai\/codex @anthropic-ai\/claude-code droid openclaw@latest\r?\n=======\r?\nRUN npm install -g --no-audit --no-fund @openai\/codex @anthropic-ai\/claude-code droid openclaw@latest\r?\n\r?\nUSER node\r?\n\r?\n>>>>>>> release\/v3\.8\.4/g,
      "RUN --mount=type=cache,target=/root/.npm \\\n  npm install -g --no-audit --no-fund @openai/codex @anthropic-ai/claude-code droid openclaw@latest\n\nUSER node"
    );

    fs.writeFileSync(dockerfile, content);
    runCmd("git add Dockerfile");
  }

  // 13. Resolve open-sse/services/combo.ts
  const openSseCombo = path.join(projectRoot, "open-sse/services/combo.ts");
  if (fs.existsSync(openSseCombo)) {
    let content = fs.readFileSync(openSseCombo, "utf-8");

    // IntentClassifierConfig imports
    content = content.replace(
      /<<<<<<< HEAD\r?\nimport \{\r?\n\s+classifyWithConfig,\r?\n\s+DEFAULT_INTENT_CONFIG,\r?\n\s+type IntentClassifierConfig,\r?\n\} from "\.\/intentClassifier\.ts";\r?\n=======\r?\nimport \{ notifyWebhookEvent \} from "\.\.\/\.\.\/src\/lib\/webhookDispatcher";\r?\nimport \{ classifyWithConfig, DEFAULT_INTENT_CONFIG \} from "\.\/intentClassifier\.ts";\r?\n>>>>>>> release\/v3\.8\.4/g,
      'import { notifyWebhookEvent } from "../../src/lib/webhookDispatcher";\nimport {\n  classifyWithConfig,\n  DEFAULT_INTENT_CONFIG,\n  type IntentClassifierConfig,\n} from "./intentClassifier.ts";'
    );

    // handlePipelineCombo call
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+handleChatCore: handleSingleModel,\r?\n\s+log: \{\r?\n\s+info: log\.info,\r?\n\s+warn: log\.warn,\r?\n\s+error: log\.error \?\? log\.warn,\r?\n\s+\},\r?\n\s+settings: settings \?\? \{\},\r?\n\s+signal: signal \?\? undefined,\r?\n=======\r?\n\s+handleChatCore: handleSingleModelWithTimeout,\r?\n\s+log,\r?\n\s+settings,\r?\n\s+signal,\r?\n>>>>>>> release\/v3\.8\.4/g,
      "          handleChatCore: handleSingleModelWithTimeout,\n          log: {\n            info: log.info,\n            warn: log.warn,\n            error: log.error ?? log.warn,\n          },\n          settings: settings ?? {},\n          signal: signal ?? undefined,"
    );

    // handleSingleModel call in loop
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+const result = await handleSingleModelWrapped\(attemptBody, modelStr, \{\r?\n=======\r?\n\s+const result = await handleSingleModelWithTimeout\(body, modelStr, \{\r?\n>>>>>>> release\/v3\.8\.4/g,
      "        const result = await handleSingleModelWithTimeout(attemptBody, modelStr, {"
    );

    // recordSessionModelUsage conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+recordSessionModelUsage\([\s\S]*?\);\r?\n\s+\r?\n=======\r?\n>>>>>>> release\/v3\.8\.4/g,
      "            recordSessionModelUsage(\n              relayOptions.sessionId,\n              combo.name,\n              modelStr,\n              provider,\n              target.connectionId ?? undefined\n            );"
    );

    fs.writeFileSync(openSseCombo, content);
    runCmd("git add open-sse/services/combo.ts");
  }

  // 14. Resolve src/app/api/copilot/chat/route.ts
  const copilotChatRoute = path.join(projectRoot, "src/app/api/copilot/chat/route.ts");
  if (fs.existsSync(copilotChatRoute)) {
    let content = fs.readFileSync(copilotChatRoute, "utf-8");

    // Imports conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\nimport \{ requireManagementAuth \} from "@\/lib\/api\/requireManagementAuth";\r?\nimport \{ processCopilotChat \} from "@\/lib\/copilot\/engine";\r?\nimport \{ isValidationFailure, validateBody \} from "@\/shared\/validation\/helpers";\r?\nimport \{ sanitizeErrorMessage \} from "@omniroute\/open-sse\/utils\/error\.ts";\r?\n=======\r?\nimport \{ processCopilotChat \} from "@\/lib\/copilot\/engine";\r?\nimport type \{ CopilotRequest \} from "@\/lib\/copilot\/engine";\r?\nimport \{ buildErrorBody \} from "@omniroute\/open-sse\/utils\/error";\r?\n>>>>>>> release\/v3\.8\.4/g,
      'import { requireManagementAuth } from "@/lib/api/requireManagementAuth";\nimport { processCopilotChat } from "@/lib/copilot/engine";\nimport { isValidationFailure, validateBody } from "@/shared/validation/helpers";\nimport { sanitizeErrorMessage, buildErrorBody } from "@omniroute/open-sse/utils/error.ts";'
    );

    // Schema content min length
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+content: z\.string\(\)\.min\(1, "message content is required"\),\r?\n=======\r?\n\s+content: z\.string\(\),\r?\n>>>>>>> release\/v3\.8\.4/g,
      '        content: z.string().min(1, "message content is required"),'
    );

    // POST implementation conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+const authError = await requireManagementAuth\(request\);\r?\n\s+if \(authError\) return authError;\r?\n\r?\n\s+try \{\r?\n\s+const rawBody = await request.json\(\);\r?\n\s+const validation = validateBody\(copilotRequestSchema, rawBody\);\r?\n\s+if \(isValidationFailure\(validation\)\) \{\r?\n\s+return NextResponse\.json\(\{ error: validation\.error \}, \{ status: 400 \}\);\r?\n=======\r?\n\s+try \{\r?\n\s+const raw = await request.json\(\);\r?\n\s+const parsed = copilotRequestSchema\.safeParse\(raw\);\r?\n\s+if \(!parsed\.success\) \{\r?\n\s+return NextResponse\.json\r?\n\s+buildErrorBody\(400, parsed\.error\.issues\[0\]\?\.message \?\? "Invalid request"\),\r?\n\s+\{ status: 400 \}\r?\n\s+\);\r?\n>>>>>>> release\/v3\.8\.4\r?\n\s+\}\r?\n\s+const body = parsed\.data as CopilotRequest;\r?\n\r?\n\s+const response = await processCopilotChat\(body\);/g,
      "  const authError = await requireManagementAuth(request);\n  if (authError) return authError;\n\n  try {\n    const rawBody = await request.json();\n    const validation = validateBody(copilotRequestSchema, rawBody);\n    if (isValidationFailure(validation)) {\n      return NextResponse.json(\n        buildErrorBody(400, validation.error),\n        { status: 400 }\n      );\n    }\n    const response = await processCopilotChat(validation.data);"
    );

    // Error handling conflict
    content = content.replace(
      /<<<<<<< HEAD\r?\n\s+const message = sanitizeErrorMessage\(error\);\r?\n\s+return NextResponse\.json\(\{ error: `Copilot error: \$\{message\}` \}, \{ status: 500 \}\);\r?\n=======\r?\n\s+\/\/ buildErrorBody\(\) routes through sanitizeErrorMessage\(\), which strips\r?\n\s+\/\/ stack traces and absolute file paths\. Hard rule #12\.\r?\n\s+const message = error instanceof Error \? error\.message : "Unknown error";\r?\n\s+return NextResponse\.json\(buildErrorBody\(500, message\), \{ status: 500 \}\);\r?\n>>>>>>> release\/v3\.8\.4/g,
      "    const message = sanitizeErrorMessage(error);\n    return NextResponse.json(buildErrorBody(500, `Copilot error: ${message}`), { status: 500 });"
    );

    fs.writeFileSync(copilotChatRoute, content);
    runCmd("git add src/app/api/copilot/chat/route.ts");
  }

  console.log("Resolutions written and staged!");
}

main();
