export interface CommandDetectionResult {
  type: string;
  command: string | null;
  confidence: number;
  category: "git" | "test" | "build" | "shell" | "docker" | "package" | "generic";
}

type Detector = {
  type: string;
  category: CommandDetectionResult["category"];
  commandPatterns: RegExp[];
  contentPatterns: RegExp[];
};

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
    type: "docker-ps",
    category: "docker",
    commandPatterns: [/^docker\s+ps\b/i],
    contentPatterns: [/^CONTAINER ID\s+IMAGE\s+COMMAND/m],
  },
  {
    type: "shell-ls",
    category: "shell",
    commandPatterns: [/^ls(?:\s+-[A-Za-z]+)?\b/i, /^find\b/i],
    contentPatterns: [/^total \d+/m, /^\S+\s+\S+\s+\d+\s+\w+\s+\d{1,2}\s+/m],
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
    if (
      /^(git|npm|pnpm|yarn|vitest|jest|pytest|python|tsc|eslint|docker|ls|find)\b/.test(trimmed)
    ) {
      return trimmed;
    }
  }
  return null;
}

export function detectCommandType(text: string, command?: string | null): CommandDetectionResult {
  const detectedCommand = command?.trim() || detectCommandFromText(text);
  let best: CommandDetectionResult | null = null;

  for (const detector of DETECTORS) {
    const commandMatched =
      Boolean(detectedCommand) &&
      detector.commandPatterns.some((pattern) => pattern.test(detectedCommand ?? ""));
    const contentMatches = detector.contentPatterns.filter((pattern) => pattern.test(text)).length;
    if (!commandMatched && contentMatches === 0) continue;

    const confidence = Math.min(1, (commandMatched ? 0.55 : 0) + contentMatches * 0.25);
    if (!best || confidence > best.confidence) {
      best = {
        type: detector.type,
        command: detectedCommand,
        confidence,
        category: detector.category,
      };
    }
  }

  return (
    best ?? {
      type: "generic-output",
      command: detectedCommand,
      confidence: detectedCommand ? 0.35 : 0.1,
      category: "generic",
    }
  );
}

export function listCommandTypes(): string[] {
  return DETECTORS.map((detector) => detector.type);
}
