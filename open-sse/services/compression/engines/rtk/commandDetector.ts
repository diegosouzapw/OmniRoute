export interface CommandDetectionResult {
  type: string;
  command: string | null;
  confidence: number;
  category:
    | "git"
    | "test"
    | "build"
    | "shell"
    | "docker"
    | "package"
    | "infra"
    | "cloud"
    | "generic";
  matchedPatterns: string[];
}

type Detector = {
  type: string;
  category: CommandDetectionResult["category"];
  commandPatterns: RegExp[];
  contentPatterns: RegExp[];
};

const COMMAND_PREFIXES = [
  "git",
  "make",
  "terraform",
  "tofu",
  "opentofu",
  "systemctl",
  "npm",
  "pnpm",
  "yarn",
  "vitest",
  "jest",
  "pytest",
  "python",
  "go",
  "cargo",
  "tsc",
  "eslint",
  "webpack",
  "vite",
  "biome",
  "prettier",
  "turbo",
  "nx",
  "playwright",
  "ruff",
  "mypy",
  "pip",
  "uv",
  "poetry",
  "golangci-lint",
  "bundle",
  "rubocop",
  "docker",
  "aws",
  "gcloud",
  "ssh",
  "rsync",
  "curl",
  "wget",
  "ls",
  "find",
  "grep",
  "rg",
  "ag",
  "ps",
  "df",
  "du",
];

const COMMAND_PREFIX_PATTERN = new RegExp(`^(?:${COMMAND_PREFIXES.join("|")})\\b`);

const DETECTORS: Detector[] = [
  {
    type: "git-status",
    category: "git",
    commandPatterns: [/^git\s+status\b/i],
    contentPatterns: [
      /^On branch /m,
      /^Changes (?:not staged|to be committed)/m,
      /^Untracked files:/m,
    ],
  },
  {
    type: "git-branch",
    category: "git",
    commandPatterns: [/^git\s+branch\b/i, /^git\s+checkout\b/i, /^git\s+switch\b/i],
    contentPatterns: [/^\*\s+\S+/m, /Switched to (?:a new )?branch/i, /Already on ['"][^'"]+['"]/i],
  },
  {
    type: "git-diff",
    category: "git",
    commandPatterns: [/^git\s+diff\b/i, /^git\s+show\b/i],
    contentPatterns: [/^diff --git /m, /^@@\s+-\d+,\d+\s+\+\d+,\d+\s+@@/m],
  },
  {
    type: "git-log",
    category: "git",
    commandPatterns: [/^git\s+log\b/i],
    contentPatterns: [/^commit [0-9a-f]{7,40}/m, /^Author: /m],
  },
  {
    type: "make",
    category: "build",
    commandPatterns: [/^make\b/i],
    contentPatterns: [/^make\[\d+\]: (?:Entering|Leaving) directory/m, /make: \*\*\* /],
  },
  {
    type: "terraform-plan",
    category: "infra",
    commandPatterns: [/^terraform\s+plan\b/i],
    contentPatterns: [/Terraform will perform the following actions:/, /Plan: \d+ to add/i],
  },
  {
    type: "tofu-plan",
    category: "infra",
    commandPatterns: [/^(?:tofu|opentofu)\s+plan\b/i],
    contentPatterns: [/OpenTofu will perform the following actions:/, /Plan: \d+ to add/i],
  },
  {
    type: "systemctl-status",
    category: "infra",
    commandPatterns: [/^systemctl\s+status\b/i],
    contentPatterns: [/^\s*Loaded:\s+/m, /^\s*Active:\s+/m, /^●\s+\S+\.service/m],
  },
  {
    type: "test-vitest",
    category: "test",
    commandPatterns: [/^vitest\b/i, /^npm\s+(?:run\s+)?test:vitest\b/i],
    contentPatterns: [/\bvitest\b/i, /^ ✓ /m, /^ ❯ /m, /Test Files\s+\d+\s+(?:passed|failed)/i],
  },
  {
    type: "test-jest",
    category: "test",
    commandPatterns: [/^jest\b/i, /^npm\s+(?:run\s+)?test\b/i],
    contentPatterns: [/Test Suites:\s+\d+/i, /Tests:\s+\d+/i, /^PASS\s+/m, /^FAIL\s+/m],
  },
  {
    type: "test-pytest",
    category: "test",
    commandPatterns: [/^pytest\b/i, /^python\s+-m\s+pytest\b/i],
    contentPatterns: [/=+\s+(?:\d+\s+)?(?:passed|failed|errors?)/i, /^E\s+/m, /^FAILED /m],
  },
  {
    type: "test-cargo",
    category: "test",
    commandPatterns: [/^cargo\s+test\b/i, /^cargo\s+nextest\b/i],
    contentPatterns: [
      /^running \d+ tests?/m,
      /^test\s+[\w:.-]+\s+\.\.\.\s+(?:ok|FAILED|ignored)/m,
      /test result:\s+(?:ok|FAILED)/i,
    ],
  },
  {
    type: "test-go",
    category: "test",
    commandPatterns: [/^go\s+test\b/i],
    contentPatterns: [/^(?:ok|FAIL)\s+[\w./-]+\s+[\d.]+s/m, /^--- FAIL: /m, /^panic: /m],
  },
  {
    type: "build-typescript",
    category: "build",
    commandPatterns: [/^tsc\b/i, /^npm\s+run\s+typecheck\b/i],
    contentPatterns: [/TS\d{4}:/, /error TS\d{4}/i],
  },
  {
    type: "build-eslint",
    category: "build",
    commandPatterns: [/^eslint\b/i, /^npm\s+run\s+lint\b/i],
    contentPatterns: [/\s+\d+:\d+\s+(?:error|warning)\s+/, /✖\s+\d+\s+problems?/],
  },
  {
    type: "build-webpack",
    category: "build",
    commandPatterns: [/^webpack\b/i, /^npx\s+webpack\b/i, /^npm\s+run\s+build:webpack\b/i],
    contentPatterns: [
      /webpack\s+\d/i,
      /compiled (?:successfully|with \d+ errors?)/i,
      /asset .+\.js/i,
    ],
  },
  {
    type: "build-vite",
    category: "build",
    commandPatterns: [/^vite\s+build\b/i, /^npm\s+run\s+build\b/i, /^pnpm\s+build\b/i],
    contentPatterns: [/vite v[\d.]+/i, /✓ built in/i, /transforming \(\d+\)/i],
  },
  {
    type: "biome",
    category: "build",
    commandPatterns: [/^biome\b/i, /^npx\s+biome\b/i],
    contentPatterns: [/lint\/[A-Za-z0-9/.-]+/, /Checked \d+ files? in/i],
  },
  {
    type: "prettier",
    category: "build",
    commandPatterns: [/^prettier\b/i, /^npx\s+prettier\b/i],
    contentPatterns: [/^Checking formatting\.\.\./m, /Code style issues found/i],
  },
  {
    type: "turbo",
    category: "build",
    commandPatterns: [/^turbo\b/i, /^npx\s+turbo\b/i],
    contentPatterns: [/^• Packages in scope:/m, /^Tasks:\s+\d+\s+successful/m],
  },
  {
    type: "nx",
    category: "build",
    commandPatterns: [/^nx\b/i, /^npx\s+nx\b/i],
    contentPatterns: [/^NX\s+/m, /^> nx run /m],
  },
  {
    type: "playwright",
    category: "test",
    commandPatterns: [/^playwright\s+test\b/i, /^npx\s+playwright\s+test\b/i],
    contentPatterns: [/Running \d+ tests? using \d+ workers?/i, /^\s+\d+ failed/m],
  },
  {
    type: "npm-install",
    category: "package",
    commandPatterns: [/^(?:npm|pnpm|yarn)\s+(?:install|add|update)\b/i],
    contentPatterns: [
      /added \d+ packages/i,
      /packages are looking for funding/i,
      /audited \d+ packages/i,
    ],
  },
  {
    type: "npm-audit",
    category: "package",
    commandPatterns: [/^(?:npm|pnpm|yarn)\s+audit\b/i],
    contentPatterns: [/found \d+ vulnerabilities/i, /\b(?:low|moderate|high|critical)\b/i],
  },
  {
    type: "ruff",
    category: "build",
    commandPatterns: [/^ruff\b/i, /^uv\s+run\s+ruff\b/i],
    contentPatterns: [/^[\w./-]+\.py:\d+:\d+:\s+[A-Z]\d+/m, /Found \d+ errors?\./i],
  },
  {
    type: "mypy",
    category: "build",
    commandPatterns: [/^mypy\b/i, /^python\s+-m\s+mypy\b/i],
    contentPatterns: [/^[\w./-]+\.py:\d+:\s+error:/m, /Found \d+ errors? in \d+ files?/i],
  },
  {
    type: "pip",
    category: "package",
    commandPatterns: [/^pip\s+(?:install|download|uninstall)\b/i, /^python\s+-m\s+pip\b/i],
    contentPatterns: [/^Collecting /m, /^Successfully installed /m],
  },
  {
    type: "uv-sync",
    category: "package",
    commandPatterns: [/^uv\s+sync\b/i, /^uv\s+pip\s+install\b/i],
    contentPatterns: [/^Resolved \d+ packages?/m, /^Installed \d+ packages?/m],
  },
  {
    type: "poetry-install",
    category: "package",
    commandPatterns: [/^poetry\s+install\b/i],
    contentPatterns: [/^Installing dependencies from lock file/m, /^Package operations:/m],
  },
  {
    type: "golangci-lint",
    category: "build",
    commandPatterns: [/^golangci-lint\b/i],
    contentPatterns: [/^[\w./-]+\.go:\d+:\d+:/m, /^\d+ issues?:/m],
  },
  {
    type: "bundle-install",
    category: "package",
    commandPatterns: [/^bundle\s+install\b/i],
    contentPatterns: [/^Fetching gem metadata from /m, /^Bundle complete!/m],
  },
  {
    type: "rubocop",
    category: "build",
    commandPatterns: [/^rubocop\b/i, /^bundle\s+exec\s+rubocop\b/i],
    contentPatterns: [/^Inspecting \d+ files/m, /^[\w./-]+\.rb:\d+:\d+:\s+[A-Z]:/m],
  },
  {
    type: "docker-ps",
    category: "docker",
    commandPatterns: [/^docker\s+ps\b/i],
    contentPatterns: [/^CONTAINER ID\s+IMAGE\s+COMMAND/m],
  },
  {
    type: "docker-logs",
    category: "docker",
    commandPatterns: [/^docker\s+logs\b/i, /^docker\s+compose\s+logs\b/i],
    contentPatterns: [
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/m,
      /\b(?:ERROR|WARN|INFO)\b/,
      /^Attaching to /m,
    ],
  },
  {
    type: "aws",
    category: "cloud",
    commandPatterns: [/^aws\b/i],
    contentPatterns: [/An error occurred \([A-Za-z0-9]+\) when calling/, /^(?:upload|download): /m],
  },
  {
    type: "gcloud",
    category: "cloud",
    commandPatterns: [/^gcloud\b/i],
    contentPatterns: [/^ERROR: \(gcloud\./m, /^Updated property \[/m],
  },
  {
    type: "ssh",
    category: "cloud",
    commandPatterns: [/^ssh\b/i],
    contentPatterns: [
      /Permission denied \(/,
      /Host key verification failed/,
      /Connection timed out/,
    ],
  },
  {
    type: "rsync",
    category: "cloud",
    commandPatterns: [/^rsync\b/i],
    contentPatterns: [/^sending incremental file list/m, /^rsync error:/m],
  },
  {
    type: "curl",
    category: "cloud",
    commandPatterns: [/^curl\b/i],
    contentPatterns: [/curl: \(\d+\)/, /^HTTP\/\d(?:\.\d)? \d{3}/m],
  },
  {
    type: "wget",
    category: "cloud",
    commandPatterns: [/^wget\b/i],
    contentPatterns: [/^--\d{4}-\d{2}-\d{2}/m, /^ERROR \d{3}:/m],
  },
  {
    type: "json-output",
    category: "generic",
    commandPatterns: [/^jq\b/i, /^cat\s+.*\.json\b/i],
    contentPatterns: [/^\s*[\[{][\s\S]*[\]}]\s*$/],
  },
  {
    type: "shell-ls",
    category: "shell",
    commandPatterns: [/^ls(?:\s+-[A-Za-z]+)?\b/i],
    contentPatterns: [/^total \d+/m, /^\S+\s+\S+\s+\d+\s+\w+\s+\d{1,2}\s+/m],
  },
  {
    type: "shell-find",
    category: "shell",
    commandPatterns: [/^find\b/i],
    contentPatterns: [/^(?:\.{1,2}|\/|[\w.-]+\/).+/m],
  },
  {
    type: "shell-grep",
    category: "shell",
    commandPatterns: [/^(?:grep|rg|ag)\b/i],
    contentPatterns: [
      /^[\w./-]+\.(?:ts|tsx|js|jsx|py|go|rs|java|rb|md|json|ya?ml|txt):\d*:/m,
      /^[\w./-]+\/[\w./-]+:\d*:/m,
    ],
  },
  {
    type: "shell-ps",
    category: "shell",
    commandPatterns: [/^ps\b/i],
    contentPatterns: [/^(?:USER\s+PID|\s*PID\s+)/m],
  },
  {
    type: "shell-df",
    category: "shell",
    commandPatterns: [/^df\b/i],
    contentPatterns: [/^Filesystem\s+.*Use%/m],
  },
  {
    type: "shell-du",
    category: "shell",
    commandPatterns: [/^du\b/i],
    contentPatterns: [/^\d+(?:\.\d+)?[KMGTP]?\s+\S+/m],
  },
  {
    type: "error-stacktrace",
    category: "generic",
    commandPatterns: [],
    contentPatterns: [
      /Traceback \(most recent call last\):/,
      /^\s+at\s+\S+\s+\(.+:\d+:\d+\)/m,
      /^panic: /m,
      /^thread '[^']+' panicked at/m,
    ],
  },
  {
    type: "generic-error",
    category: "generic",
    commandPatterns: [],
    contentPatterns: [/Error:/, /Exception:/, /Traceback \(most recent call last\):/],
  },
];

export function detectCommandFromText(text: string): string | null {
  const firstLines = text.split(/\r?\n/).slice(0, 4);
  for (const line of firstLines) {
    const trimmed = line.trim().replace(/^\$\s+/, "");
    if (!trimmed) continue;
    if (COMMAND_PREFIX_PATTERN.test(trimmed)) {
      return trimmed;
    }
  }
  return null;
}

export function detectCommandType(text: string, command?: string | null): CommandDetectionResult {
  const detectedCommand = command?.trim() || detectCommandFromText(text);
  let best: CommandDetectionResult | null = null;

  for (const detector of DETECTORS) {
    const matchedPatterns: string[] = [];
    const commandMatched =
      Boolean(detectedCommand) &&
      detector.commandPatterns.some((pattern) => {
        const matched = pattern.test(detectedCommand ?? "");
        if (matched) matchedPatterns.push(pattern.source);
        return matched;
      });
    const contentMatches = detector.contentPatterns.filter((pattern) => {
      const matched = pattern.test(text);
      if (matched) matchedPatterns.push(pattern.source);
      return matched;
    }).length;
    if (!commandMatched && contentMatches === 0) continue;

    const confidence = Math.min(1, (commandMatched ? 0.55 : 0) + contentMatches * 0.25);
    if (!best || confidence > best.confidence) {
      best = {
        type: detector.type,
        command: detectedCommand,
        confidence,
        category: detector.category,
        matchedPatterns,
      };
    }
  }

  return (
    best ?? {
      type: "unknown",
      command: detectedCommand,
      confidence: detectedCommand ? 0.35 : 0.1,
      category: "generic",
      matchedPatterns: [],
    }
  );
}

export function listCommandTypes(): string[] {
  return DETECTORS.map((detector) => detector.type);
}

export const detectCommandOutput = detectCommandType;
