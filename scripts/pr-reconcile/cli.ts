import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

type Command = "collect" | "dispatch";

type CliOptions = Record<string, string | boolean>;

type ReconcilePayload = {
  eventName: string;
  repository: string;
  runId: string;
  runAttempt: string;
  collectedAt: string;
  pullRequest?: {
    number?: number;
    title?: string;
    url?: string;
    headSha?: string;
    headRef?: string;
    baseRef?: string;
    author?: string;
  };
  review?: {
    state?: string;
    author?: string;
    body?: string;
    url?: string;
  };
  comment?: {
    author?: string;
    body?: string;
    url?: string;
  };
  workflowRun?: {
    id?: number;
    name?: string;
    conclusion?: string;
    url?: string;
    headSha?: string;
  };
};

function parseArgs(argv: string[]): { command: Command; options: CliOptions } {
  const [commandRaw, ...rest] = argv;
  if (commandRaw !== "collect" && commandRaw !== "dispatch") {
    throw new Error("usage: cli.ts <collect|dispatch> [--key value] [--flag]");
  }

  const options: CliOptions = {};
  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (!token.startsWith("--")) {
      throw new Error(`unexpected argument: ${token}`);
    }

    const key = token.slice(2);
    const next = rest[i + 1];
    if (!next || next.startsWith("--")) {
      options[key] = true;
      continue;
    }

    options[key] = next;
    i += 1;
  }

  return { command: commandRaw, options };
}

function requiredString(options: CliOptions, key: string): string {
  const value = options[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`missing required --${key}`);
  }
  return value;
}

function optionalString(options: CliOptions, key: string): string | undefined {
  const value = options[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function asObject(value: unknown): Record<string, any> {
  return value && typeof value === "object" ? (value as Record<string, any>) : {};
}

function pullRequestFromEvent(event: Record<string, any>): ReconcilePayload["pullRequest"] {
  const pr = asObject(event.pull_request ?? event.workflow_run?.pull_requests?.[0]);
  if (!Object.keys(pr).length) return undefined;

  return {
    number: typeof pr.number === "number" ? pr.number : undefined,
    title: typeof pr.title === "string" ? pr.title : undefined,
    url: typeof pr.html_url === "string" ? pr.html_url : undefined,
    headSha: typeof pr.head?.sha === "string" ? pr.head.sha : undefined,
    headRef: typeof pr.head?.ref === "string" ? pr.head.ref : undefined,
    baseRef: typeof pr.base?.ref === "string" ? pr.base.ref : undefined,
    author: typeof pr.user?.login === "string" ? pr.user.login : undefined,
  };
}

function reviewFromEvent(event: Record<string, any>): ReconcilePayload["review"] {
  const review = asObject(event.review);
  if (!Object.keys(review).length) return undefined;

  return {
    state: typeof review.state === "string" ? review.state : undefined,
    author: typeof review.user?.login === "string" ? review.user.login : undefined,
    body: typeof review.body === "string" ? review.body : undefined,
    url: typeof review.html_url === "string" ? review.html_url : undefined,
  };
}

function commentFromEvent(event: Record<string, any>): ReconcilePayload["comment"] {
  const comment = asObject(event.comment);
  if (!Object.keys(comment).length) return undefined;

  return {
    author: typeof comment.user?.login === "string" ? comment.user.login : undefined,
    body: typeof comment.body === "string" ? comment.body : undefined,
    url: typeof comment.html_url === "string" ? comment.html_url : undefined,
  };
}

function workflowRunFromEvent(event: Record<string, any>): ReconcilePayload["workflowRun"] {
  const workflowRun = asObject(event.workflow_run);
  if (!Object.keys(workflowRun).length) return undefined;

  return {
    id: typeof workflowRun.id === "number" ? workflowRun.id : undefined,
    name: typeof workflowRun.name === "string" ? workflowRun.name : undefined,
    conclusion: typeof workflowRun.conclusion === "string" ? workflowRun.conclusion : undefined,
    url: typeof workflowRun.html_url === "string" ? workflowRun.html_url : undefined,
    headSha: typeof workflowRun.head_sha === "string" ? workflowRun.head_sha : undefined,
  };
}

async function collect(options: CliOptions): Promise<void> {
  const eventPath = requiredString(options, "event-path");
  const output = requiredString(options, "output");
  const event = JSON.parse(await readFile(eventPath, "utf8"));

  const payload: ReconcilePayload = {
    eventName: requiredString(options, "event-name"),
    repository: requiredString(options, "repository"),
    runId: requiredString(options, "run-id"),
    runAttempt: requiredString(options, "run-attempt"),
    collectedAt: new Date().toISOString(),
    pullRequest: pullRequestFromEvent(event),
    review: reviewFromEvent(event),
    comment: commentFromEvent(event),
    workflowRun: workflowRunFromEvent(event),
  };

  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`[pr-reconcile] wrote payload: ${output}`);
}

async function dispatch(options: CliOptions): Promise<void> {
  const payloadPath = requiredString(options, "payload");
  const payload = JSON.parse(await readFile(payloadPath, "utf8"));
  const webhookUrl = optionalString(options, "webhook-url");

  if (options["dry-run"] || !webhookUrl) {
    console.log("[pr-reconcile] dry run; dispatch skipped");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const headers: Record<string, string> = { "content-type": "application/json" };
  const token = process.env.KILO_RECONCILE_WEBHOOK_TOKEN;
  if (token) headers.authorization = `Bearer ${token}`;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`webhook dispatch failed: ${response.status} ${await response.text()}`);
  }

  console.log(`[pr-reconcile] dispatched payload: ${response.status}`);
}

async function main(): Promise<void> {
  const { command, options } = parseArgs(process.argv.slice(2));
  if (command === "collect") {
    await collect(options);
    return;
  }

  await dispatch(options);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
