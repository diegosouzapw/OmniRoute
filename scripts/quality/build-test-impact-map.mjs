import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SRC_ROOTS = ["src", "open-sse"];
const IMPORT_RE =
  /(?:import|export)[^'"]*from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)|import\(\s*['"]([^'"]+)['"]\s*\)/g;
const EXTS = [".ts", ".tsx", ".mts", ".js", ".mjs"];

export function resolveImport(spec, fromFile, root = ROOT) {
  let base;
  if (spec.startsWith("@/")) base = path.join(root, "src", spec.slice(2));
  else if (spec.startsWith("@omniroute/open-sse"))
    base = path.join(root, "open-sse", spec.replace(/^@omniroute\/open-sse\/?/, ""));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(fromFile), spec);
  else return null;
  for (const e of EXTS) {
    if (fs.existsSync(base + e)) return base + e;
  }
  for (const e of EXTS) {
    const idx = path.join(base, "index" + e);
    if (fs.existsSync(idx)) return idx;
  }
  return fs.existsSync(base) && fs.statSync(base).isFile() ? base : null;
}

export function sourceDepsOf(entry, root = ROOT) {
  const seen = new Set();
  const stack = [entry];
  const sources = new Set();
  while (stack.length) {
    const f = stack.pop();
    if (seen.has(f)) continue;
    seen.add(f);
    let code;
    try {
      code = fs.readFileSync(f, "utf8");
    } catch {
      continue;
    }
    for (const m of code.matchAll(IMPORT_RE)) {
      const spec = m[1] || m[2] || m[3];
      if (!spec) continue;
      const r = resolveImport(spec, f, root);
      if (!r) continue;
      const rel = path.relative(root, r);
      if (SRC_ROOTS.some((s) => rel.startsWith(s + path.sep))) sources.add(rel);
      stack.push(r);
    }
  }
  return sources;
}

// Mirror EXACTLY the `npm run test:unit` glob — the curated set of node:test files.
// The TIA step runs the selected subset via `node --test`, so it must NOT include
// vitest files (`.test.tsx`, `open-sse/**/__tests__`, `tests/unit/autoCombo`), nor
// e2e/integration tests, which can't run under node:test (they 99-false-failed before).
// Mirror EXACTLY the package.json `test:unit` / `test:unit:ci` globs (incl. memory,
// usage, combo, dashboard, serial, and *.test.mjs). Drift here → false __RUN_ALL__.
export function buildTestImpactMap(root = ROOT) {
  const testFiles = globSync(
    [
      "tests/unit/*.test.ts",
      "tests/unit/{a2a,account,adaptive,admission,adobe,agent,agentSkills,agentrouter,agy,aihorde,alibaba,anthropic,antigravity,api,apikeys,audio,audit,auth,authz,auto,bailian,base,batch,blackbox,bug,build,bulk,cache,call,catalog,cc,chat,chatcore,chatgpt,check,circuit,claude,cli,cli-helper,cline,cliproxyapi,cloud,cloudflare,codex,combo,combos,command,compression,conductor,connection,context,copilot,correctness,cors,credential,crof,cursor,custom,dahl,dashboard,db,db-adapters,deepseek,dev,devin,docker,dockerfile,docs,domain,duckduckgo,electron,embedding,embeddings,empty,error,exclusive,executor,firecrawl,fix,free,freeProviderRankings,fusion,gamification,gemini,github,gitlab,glm,grok,guardrails,headroom,helpers,home,homolog,i18n,image,inspector,instrumentation,issue,json,kie,kimi,kiro,lib,live,lmarena,local,log,m365,management,mcp,media,memory,microsoft,migration,minimax,misc,mitm,modality,model,models,muse,no,noauth,notion,nvidia,oauth,obsidian,ocr,ollama,openai,openapi,opencode,openrouter,pack,perplexity,playground,plugins,pricing,probe,prompt,provider,providers,proxy,proxyfetch,qoder,quota,qwen,radar,rate,rateLimitManager,reasoning,refactor,relay,remote,repro,request,rerank,resilience,resolve,resource,responses,route,router,routing,run,runtime,search,security,service,services,session,settings,shared,sidebar,skills,socks,sse,stream,sync,synced,system,task,test,thinking,tls,token,tool,topology,tproxy,translator,ts7,uc,ui,upstream,usage,v1,v388,validation,vercel,vertex,video,vision,vscode,web,webhook,windows,xai,zai,zed}/**/*.test.ts",
      "tests/unit/**/*.test.mjs",
      "tests/unit/dashboard/**/*.test.ts",
      // Quarentena serial (P0.3): também são node:test — a TIA precisa mapeá-los.
      "tests/unit/serial/**/*.test.ts",
    ],
    { cwd: root, absolute: true }
  );
  const map = {};
  for (const tf of testFiles) {
    const relTest = path.relative(root, tf);
    for (const src of sourceDepsOf(tf, root)) {
      (map[src] ||= []).push(relTest);
    }
  }
  for (const k of Object.keys(map)) map[k].sort();
  return { generatedFrom: "import-graph", sources: map, testFileCount: testFiles.length };
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  const result = buildTestImpactMap();
  const { testFileCount, ...map } = result;
  const out = path.join(ROOT, "config/quality/test-impact-map.json");
  fs.writeFileSync(out, JSON.stringify(map, null, 2) + "\n");
  console.log(
    `test-impact-map: ${Object.keys(map.sources).length} source files mapped from ${testFileCount} test files`
  );
}
