/**
 * tests/integration/liveGeminiShared.ts
 *
 * Shared utilities for live Gemini workload tests (streaming + non-streaming).
 * Import from here to reuse payload generators without duplicating code.
 */
import assert from "node:assert/strict";

export const API_KEY = process.env.OMNIROUTE_API_KEY;
export const BASE_URL = process.env.OMNIROUTE_URL || "http://localhost:3000";
export const MODEL = "default";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const DELAY_BETWEEN_REQUESTS_MS = Number(process.env.TEST_DELAY_MS) || 5000;

export const skip = !API_KEY ? "OMNIROUTE_API_KEY not set — skipping live test" : undefined;

// --------------------------------------------------------------------------
// Test Environment Setup — ensures gemini provider + "default" combo exist
// --------------------------------------------------------------------------

const DEFAULT_COMBO_CONFIG = {
  name: "default",
  strategy: "auto",
  models: [
    { model: "gemini/gemma-4-31b-it", providerId: "gemini" },
    { model: "gemini/gemma-4-26b-a4b-it", providerId: "gemini" },
  ],
  config: {
    maxRetries: 3,
    retryDelayMs: 500,
    maxComboDepth: 3,
    trackMetrics: true,
    failoverBeforeRetry: true,
    maxSetRetries: 3,
    candidatePool: ["gemini"],
    targetTimeoutMs: 300_000,
    streamPreBuffer: { enabled: false, mode: "tokens", threshold: 100 },
  },
};

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}

async function ensureGeminiProvider(): Promise<boolean> {
  try {
    const res = await apiFetch("/api/providers");
    if (!res.ok) return false;
    const data = await res.json();
    const connections = data.connections || data;
    const geminiActive = Array.isArray(connections)
      ? connections.find(
          (c: any) => c.provider === "gemini" && c.isActive && c.testStatus !== "expired"
        )
      : null;

    if (geminiActive) {
      console.log(`  [setup] gemini provider active (id=${geminiActive.id.slice(0, 8)}…)`);
      return true;
    }

    // Check if gemini exists but is expired — try to reactivate via DB
    const geminiExpired = Array.isArray(connections)
      ? connections.find((c: any) => c.provider === "gemini" && c.isActive)
      : null;

    if (geminiExpired) {
      console.log(
        `  [setup] gemini provider expired (id=${geminiExpired.id.slice(0, 8)}…), reactivating via DB...`
      );
      // The health check marks API-key connections as expired because it expects
      // OAuth refresh tokens. Force test_status=active via direct DB update.
      try {
        const { getDbInstance } = await import("../../src/lib/db/core.ts");
        const db = getDbInstance();
        db.prepare(
          "UPDATE provider_connections SET test_status = 'active', error_code = NULL, last_error = NULL WHERE id = ?"
        ).run(geminiExpired.id);
        console.log(`  [setup] Reactivated gemini connection ${geminiExpired.id.slice(0, 8)}…`);
        return true;
      } catch (dbErr) {
        console.warn(`  [setup] DB reactivation failed: ${dbErr}`);
      }
    }

    // No gemini connection at all — create one with GEMINI_API_KEY
    if (!GEMINI_API_KEY) {
      console.warn("  [setup] No active gemini connection and GEMINI_API_KEY not set — skipping");
      return false;
    }

    console.log(`  [setup] Creating gemini provider with GEMINI_API_KEY...`);
    const createRes = await apiFetch("/api/providers", {
      method: "POST",
      body: JSON.stringify({
        provider: "gemini",
        apiKey: GEMINI_API_KEY,
        name: "gemini-test",
        testStatus: "active",
        healthCheckInterval: 999999999,
      }),
    });
    if (!createRes.ok) {
      const err = await createRes.text();
      console.warn(`  [setup] Failed to create gemini provider: ${createRes.status} ${err}`);
      return false;
    }

    const created = await createRes.json();
    const connId = created?.connection?.id;
    if (connId) {
      // Force test_status=active via direct DB — the health check will otherwise
      // mark it expired immediately because there's no OAuth refresh token.
      try {
        const { getDbInstance } = await import("../../src/lib/db/core.ts");
        const db = getDbInstance();
        db.prepare(
          "UPDATE provider_connections SET test_status = 'active', error_code = NULL, last_error = NULL WHERE id = ?"
        ).run(connId);
        console.log(`  [setup] gemini provider created and activated (id=${connId.slice(0, 8)}…)`);
      } catch (dbErr) {
        console.warn(`  [setup] DB activation failed: ${dbErr}`);
        console.log(`  [setup] gemini provider created (id=${connId?.slice(0, 8)}…)`);
      }
    }
    return true;
  } catch (err) {
    console.warn(`  [setup] Could not check/create gemini provider: ${err}`);
    return false;
  }
}

async function ensureDefaultCombo(): Promise<void> {
  try {
    const res = await apiFetch("/api/combos");
    if (!res.ok) return;
    const data = await res.json();
    const combos = data.combos || data;
    const existing = Array.isArray(combos) ? combos.find((c: any) => c.name === "default") : null;

    if (existing) {
      console.log(
        `  [setup] "default" combo exists (strategy=${existing.strategy}, models=${existing.models?.length})`
      );
      return;
    }

    console.log(`  [setup] Creating "default" combo with gemma-4 models...`);
    const createRes = await apiFetch("/api/combos", {
      method: "POST",
      body: JSON.stringify(DEFAULT_COMBO_CONFIG),
    });
    if (createRes.ok) {
      console.log(`  [setup] "default" combo created successfully`);
    } else {
      const err = await createRes.text();
      console.warn(`  [setup] Failed to create "default" combo: ${createRes.status} ${err}`);
    }
  } catch (err) {
    console.warn(`  [setup] Could not check/create combo: ${err}`);
  }
}

export async function ensureTestEnvironment(): Promise<void> {
  if (!API_KEY) return;
  console.log(`\n  [setup] Ensuring test environment...`);
  await ensureGeminiProvider();
  await ensureDefaultCombo();
}

// --------------------------------------------------------------------------
// Test Data Generator
// --------------------------------------------------------------------------
export type Message = { role: string; content: string };

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const SYSTEM_PROMPTS = [
  "You are a helpful coding assistant. Respond concisely and accurately.",
  "You are a senior software engineer reviewing code. Be thorough and critical.",
  "You are a data scientist analyzing complex datasets. Explain your reasoning step by step.",
  "You are a technical writer creating documentation. Be clear and well-structured.",
  "You are a DevOps engineer debugging infrastructure issues. Think about root causes.",
  "You are a security auditor reviewing code for vulnerabilities. Be meticulous.",
  "You are an AI researcher explaining concepts. Use analogies and examples.",
  "You are a product manager evaluating technical proposals. Consider trade-offs.",
];

export const USER_PROMPTS = [
  "Write a function that implements a trie data structure with insert, search, and startsWith methods.",
  "Explain the difference between REST and GraphQL, with pros and cons of each.",
  "Debug this code and explain what's wrong: function sum(a,b){return a+b} console.log(sum(1,2,3))",
  "Write a SQL query to find the top 5 most common words in a articles table across all articles.",
  "Compare and contrast Docker vs Podman for container orchestration.",
  "Explain how HTTP/2 multiplexing works and why it improves performance.",
  "Write a Python decorator that caches function results with a TTL.",
  "What are the trade-offs between microservices and monoliths? When would you choose each?",
  "Design a rate limiter algorithm. Compare token bucket vs sliding window.",
  "Explain the CAP theorem and how it applies to distributed databases.",
  "Write a React custom hook for WebSocket connections with auto-reconnect.",
  "How does garbage collection work in V8 JavaScript engine?",
  "Compare SQLite vs PostgreSQL for a production web application.",
  "Write a bash script that monitors CPU and memory usage and alerts when thresholds are exceeded.",
  "Explain zero-trust networking principles and how to implement them.",
  "Write a TypeScript type-safe event emitter class.",
  "How does TLS 1.3 handshake work? Compare with TLS 1.2.",
  "Design a URL shortening service. Cover the database schema, API design, and scaling considerations.",
  "Explain the event loop in Node.js with specific examples of microtasks vs macrotasks.",
  "Write a regex to validate email addresses and explain the trade-offs.",
  "Compare Kafka vs RabbitMQ for event-driven architectures.",
  "How would you implement feature flags in a distributed system?",
  "Write an implementation of Promise.all() with timeout support.",
  "Explain the actor model and how it compares to traditional threading.",
  "Design a caching strategy for a read-heavy API serving 10k requests/second.",
];

export const CODE_BLOCKS = [
  `\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\``,
  `\`\`\`javascript
const pipeline = (initial, ...fns) =>
  fns.reduce((acc, fn) => fn(acc), initial);

const result = pipeline(
  5,
  x => x * 2,
  x => x + 1,
  x => x ** 2
);
\`\`\``,
  `\`\`\`typescript
interface Task<T> {
  id: string;
  priority: number;
  execute: () => Promise<T>;
  timeout: number;
}

class TaskQueue<T> {
  private queue: Task<T>[] = [];
  private running = false;

  async enqueue(task: Task<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        ...task,
        execute: () => task.execute().then(resolve).catch(reject),
      });
      if (!this.running) this.processNext();
    });
  }

  private async processNext(): Promise<void> {
    this.running = true;
    const sorted = this.queue.sort((a, b) => b.priority - a.priority);
    const task = sorted.shift();
    if (task) {
      const result = await task.execute();
      this.processNext();
    } else {
      this.running = false;
    }
  }
}
\`\`\``,
  `\`\`\`sql
WITH word_freq AS (
  SELECT
    UNNEST(STRING_TO_ARRAY(LOWER(content), ' ')) AS word,
    COUNT(*) AS cnt
  FROM articles
  WHERE content IS NOT NULL
  GROUP BY word
)
SELECT word, cnt
FROM word_freq
WHERE LENGTH(word) > 3
ORDER BY cnt DESC
LIMIT 20;
\`\`\``,
  `\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  database.url: "postgresql://db.internal:5432/app"
  redis.host: "redis-cluster.internal"
  redis.port: "6379"
  log.level: "info"
  feature.flags: '{"darkMode":true,"betaApi":false,"newDashboard":true}'
\`\`\``,
];

export const LONG_DOCUMENTS = [
  `In distributed systems theory, the CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency (every read receives the most recent write or an error), Availability (every request receives a non-error response, without the guarantee that it contains the most recent write), and Partition Tolerance (the system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes). This fundamental trade-off was first articulated by Eric Brewer in 2000 and later formally proven as a theorem by Seth Gilbert and Nancy Lynch in 2002.

  The practical implication of CAP is that when a network partition occurs, system designers must choose between consistency and availability. Traditional ACID-compliant databases like PostgreSQL typically choose consistency (CP), while many NoSQL systems like Cassandra choose availability (AP). However, modern systems increasingly recognize that CAP is not binary — techniques like conflict-free replicated data types (CRDTs), consensus algorithms like Raft, and hybrid approaches allow systems to achieve different trade-offs at different levels.

  In practice, most production systems aim for "PA/EL" (Partition-Aware / Eventually-Literate) or use compensatory transactions to handle inconsistencies. The PACELC extension further refines CAP by noting that even when the network is functioning normally (no partition), there's still a trade-off between latency and consistency. Systems like Amazon DynamoDB and Google Spanner represent different points on this continuum, with Spanner using TrueTime to achieve external consistency at higher latency, while DynamoDB prioritizes availability and partition tolerance with weaker consistency models.`,

  `Concurrency models represent fundamentally different approaches to managing multiple computations that overlap in time. The traditional threading model, used extensively in languages like Java and C++, relies on shared memory with explicit locking mechanisms (mutexes, semaphores, read-write locks) to coordinate access to shared state. This model is well-understood but notoriously difficult to get right — deadlocks, race conditions, and priority inversion are common bugs that can be extremely subtle.

  The actor model, popularized by Erlang and later adopted by Akka, Dapr, and Orleans, takes a different approach: each actor is an independent computation unit with its own private state, communicating exclusively through asynchronous message passing. Actors can create other actors, send messages, and change their behavior for the next message they receive. This model eliminates shared-state concurrency issues entirely, since actors never share memory — they only share messages. The trade-off is that certain patterns (like distributed transactions) become more complex to implement.

  Software Transactional Memory (STM) offers another paradigm, borrowing from database transactions to manage memory accesses. Clojure's STM, for instance, uses multiversion concurrency control (MVCC) to provide optimistic concurrency — transactions proceed in isolation and are committed atomically, with automatic retry on conflicts. STM can be more ergonomic than explicit locking, but performance overhead and the challenge of handling side effects within transactions remain concerns.

  The structured concurrency model, recently gaining traction through Kotlin coroutines, Java virtual threads, and Swift's async/await, organizes concurrent operations into a hierarchy where each operation's lifetime is scoped to its enclosing block. This ensures proper cleanup, simplifies error propagation, and prevents resource leaks. Go's goroutines follow a similar philosophy with channels providing CSP-style communication (Communicating Sequential Processes), where processes communicate by sending values through typed channels rather than through shared memory.

  For I/O-bound workloads, event-driven models (Node.js, Python asyncio, C# async/await) use an event loop to multiplex concurrent operations onto a single thread, avoiding context-switching overhead. This works well when the workload is primarily waiting on I/O, but CPU-bound work can block the event loop and degrade responsiveness. The modern trend is toward hybrid approaches that combine the scalability of event-driven models with the flexibility of thread pools for CPU-intensive work.`,

  `Event sourcing is an architectural pattern where state changes are stored as an immutable sequence of events, rather than as the current state. Instead of updating a row in a database when a user changes their email address, you append an "EmailChanged" event to an event store. The current state is derived by replaying all events for that entity. This fundamental shift in thinking has profound implications for system design, traceability, and temporal queries.

  The primary advantages of event sourcing include: complete audit trail (every state change is recorded with full context), temporal querying (you can reconstruct state at any point in time), event-driven architecture fit (events can be published to downstream consumers naturally), and the ability to create multiple different views (projections) from the same event stream. Command Query Responsibility Segregation (CQRS) is a natural companion pattern, where write operations use the event store and read operations use pre-computed projections optimized for specific query patterns.

  However, event sourcing introduces significant complexity: event schema evolution must be carefully managed (events are permanent), the event store becomes a critical piece of infrastructure requiring careful backup and disaster recovery, and read models can be eventually consistent with the write model, potentially serving stale data. Common implementation patterns using PostgreSQL as an event store include the "outbox pattern" with transactional outbox tables, and using JSONB columns for flexible event payloads while maintaining indexed metadata columns for efficient querying.

  Tools like Kafka (for event streaming), Debezium (for change data capture), and Axon Framework (for Java-based CQRS/ES) provide infrastructure to implement these patterns. The decision to adopt event sourcing should be driven by concrete requirements for audit trails, temporal queries, or complex event-driven workflows — it adds significant complexity that may not be justified for simpler CRUD applications.`,
];

export const AGENTIC_TASKS = [
  "I need to build a microservice that processes webhook events. Let's start with the requirements. First, what should I consider when designing the webhook ingestion endpoint?",
  "Let me show you what I have so far for the task queue system. Actually, first let me reconsider the requirements — we need to handle priorities and timeouts.",
  "I'm working on refactoring the authentication module. Looking at the current code, I see we're using JWT with refresh tokens. But we also need API key auth for service-to-service communication.",
  "Before we write any code, let me think about the data model. We have users, organizations, projects, and teams. Users can belong to multiple organizations and each project belongs to one organization.",
  "Let me walk through the deployment pipeline. We build with Docker, push to GHCR, deploy to Kubernetes. But we're seeing issues with rolling updates — sometimes the old pods serve requests after the new ones are ready.",
  "I just realized there's a security concern. We're exposing internal service names in error messages returned to the client. Let me check all the error handling paths.",
  "OK I've been thinking about the caching strategy more. We need multi-layer caching: Redis for API responses, CDN for static assets, and browser caching for images. But invalidation is tricky — what happens when a user updates their avatar?",
  "Let me trace through the payment flow end to end. User submits payment → we create a pending transaction → call Stripe → handle webhook → update order status → send confirmation email. Each step has failure modes.",
];

// --------------------------------------------------------------------------
// Generator helpers
// --------------------------------------------------------------------------

export function genSystemMessage(): Message {
  return { role: "system", content: pick(SYSTEM_PROMPTS) };
}

export function genUserMessage(): Message {
  return { role: "user", content: pick(USER_PROMPTS) };
}

export function genCodeReviewMessage(): Message {
  return {
    role: "user",
    content: `Review this code and suggest improvements:\n${pick(CODE_BLOCKS)}\n\nFocus on: performance, readability, edge cases.`,
  };
}

export function genLongDocMessage(): Message {
  return {
    role: "user",
    content: `Please summarize the following text and extract 5 key insights:\n\n${pick(LONG_DOCUMENTS)}`,
  };
}

export function genAgenticTaskMessage(): Message {
  return { role: "user", content: pick(AGENTIC_TASKS) };
}

export function genMultiTurnConversation(turns: number): Message[] {
  const messages: Message[] = [];

  if (Math.random() > 0.3) {
    messages.push({ role: "system", content: pick(SYSTEM_PROMPTS) });
  }

  const topics = [
    "building a real-time chat application with WebSockets",
    "designing a distributed task queue",
    "implementing OAuth 2.0 from scratch",
    "optimizing database query performance at scale",
    "creating a monitoring and alerting system",
    "building a feature flag system with gradual rollout",
    "designing an API gateway with rate limiting",
    "implementing event-driven microservices",
  ];

  const topic = pick(topics);

  const assistantReplies = [
    `Great question about ${topic}. Let me break this down systematically and consider the key design decisions involved. First, we need to understand the core requirements and constraints. The main challenges here are around scalability, reliability, and maintainability.\n\nLet me start with the architecture: I'd recommend a layered approach. At the foundation, we need a solid data model. Then we build the business logic layer, followed by the API layer. For ${topic}, we should consider using established patterns like the repository pattern for data access and the strategy pattern for algorithm selection.\n\nHere's a concrete example of how I'd structure this:\n\n1. First, define clear interfaces and contracts\n2. Implement the core logic with dependency injection\n3. Add observability (metrics, logging, tracing)\n4. Write comprehensive tests\n5. Add performance optimizations iteratively`,
    `Building on what we discussed about ${topic}, I want to dive deeper into the implementation details. There are several important design patterns that apply here.\n\nThe key insight is that we need to separate concerns properly. Let me illustrate with a specific scenario:\n\nConsider how data flows through the system. We receive input, process it through a pipeline, and produce output. Each stage of the pipeline should be independently testable and replaceable.\n\nSome common pitfalls to avoid:\n- Tight coupling between components\n- Neglecting error handling and edge cases\n- Premature optimization without profiling\n- Ignoring security implications\n\nInstead, focus on:\n- Clean interfaces between modules\n- Comprehensive error handling with meaningful messages\n- Performance baselines before optimization\n- Security review as part of the design process`,
    `Let me reconsider my approach to ${topic}. After thinking about it more carefully, I realize there are some important nuances I should address.\n\nThe initial approach I suggested works for small to medium scale, but for production systems we need to consider:\n\n1. **Resilience**: What happens when dependencies fail? Circuit breakers, retries with exponential backoff, graceful degradation.\n2. **Observability**: How do we know the system is working correctly? Distributed tracing, structured logging, metrics with dashboards.\n3. **Operational complexity**: How do we deploy, monitor, and debug this in production?\n\nLet me revise the architecture to address these concerns...`,
  ];

  const followUps = [
    `That's helpful. Now let me think about the specific implementation. How would you handle error cases where ${topic} encounters a failure mid-operation? Should we use compensating transactions or rollback?`,
    `I see. Building on that, what about monitoring and observability for ${topic}? What metrics should we track and what alerting thresholds make sense?`,
    `Interesting points. Going deeper — how would we test ${topic}? Integration tests? E2E tests? Property-based testing? What's the testing strategy?`,
    `That makes sense. Now considering the deployment aspect — how would we roll out ${topic} incrementally? Feature flags? Blue-green deployment? Canary releases?`,
    `One more thing — for ${topic}, how do we handle data consistency across services? Eventual consistency? Saga pattern? Two-phase commit?`,
    `Let me think about the security implications of ${topic}. What are the threat models we should consider? Authentication, authorization, data encryption, audit logging?`,
    `Good. Now about performance — what's the bottleneck in ${topic}? Database queries? Network calls? CPU-bound computation? How do we profile and optimize?`,
  ];

  messages.push({
    role: "user",
    content: `I need help with ${topic}. Can you walk me through the design and implementation?`,
  });

  const numTurns = Math.min(turns, 6);

  for (let i = 0; i < numTurns; i++) {
    messages.push({ role: "assistant", content: pick(assistantReplies) });
    messages.push({ role: "user", content: pick(followUps) });
  }

  return messages;
}

export function genCodeConversation(): Message[] {
  return [
    {
      role: "system",
      content: "You are a senior developer reviewing production code. Be thorough.",
    },
    {
      role: "user",
      content: `I have this code that's causing performance issues in production. Can you help me optimize it?\n\n${pick(CODE_BLOCKS)}\n\nThe function is called about 10,000 times per second and we're seeing GC pressure.`,
    },
    {
      role: "assistant",
      content:
        "Let me analyze the code for performance issues. I can see several opportunities for optimization:\n\n1. **Allocation pressure**: The code creates intermediate objects on every call. We should reuse buffers or use object pooling.\n2. **Algorithmic complexity**: The current approach is O(n²) but we can make it O(n log n) with a better data structure.\n3. **GC overhead**: Frequent allocations trigger GC pauses.\n\nLet me provide an optimized version that addresses these issues.",
    },
    {
      role: "user",
      content:
        "Thanks, that helped a lot. Now, I also need to add error handling. What patterns do you recommend for this kind of batch processing? Should I use the Result pattern, exceptions, or something else?",
    },
    {
      role: "assistant",
      content:
        "For batch processing, I recommend a combination approach:\n\nUse a Result/Either type for expected failures (validation errors, not-found cases) and exceptions for unexpected failures (network errors, bugs). This gives you typed error handling for business logic while keeping unexpected errors visible.\n\nHere's a pattern I use:\n\n```typescript\ntype Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };\n\nasync function processBatch(items: Item[]): Promise<Result<Processed[], BatchError>> {\n  const results: Processed[] = [];\n  for (const item of items) {\n    try {\n      const processed = await processItem(item);\n      results.push(processed);\n    } catch (err) {\n      return { ok: false, error: new BatchError(item.id, err) };\n    }\n  }\n  return { ok: true, value: results };\n}\n```\n\nThis way callers can pattern-match on the result without try/catch everywhere.",
    },
    {
      role: "user",
      content:
        "That pattern looks clean. One more question — how should I test the batch processor? I want good coverage but the tests are slow because of the async operations.",
    },
  ];
}

// --------------------------------------------------------------------------
// SSE Stream Reader
// --------------------------------------------------------------------------

interface StreamResult {
  fullContent: string;
  finishReason: string;
  totalTokens: number;
}

export async function readSSEStream(response: Response): Promise<StreamResult> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullContent = "";
  let finishReason = "unknown";
  let totalTokens = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;

      try {
        const parsed = JSON.parse(data) as Record<string, unknown>;
        const choice = ((parsed?.choices ?? []) as Array<Record<string, unknown>>)[0];
        if (choice) {
          const delta = choice.delta as Record<string, unknown> | undefined;
          if (delta?.content) fullContent += delta.content as string;
          if (choice.finish_reason) finishReason = choice.finish_reason as string;
        }
        const usage = parsed.usage as Record<string, number> | undefined;
        if (usage) {
          totalTokens =
            usage.total_tokens ?? (usage.prompt_tokens ?? 0) + (usage.completion_tokens ?? 0);
        }
      } catch {
        // skip malformed chunks
      }
    }
  }

  return { fullContent, finishReason, totalTokens };
}

// --------------------------------------------------------------------------
// Shared helper
// --------------------------------------------------------------------------

export async function sendAndValidate(
  tcName: string,
  buildMessages: () => Message[],
  stream = true
): Promise<{
  status: number;
  duration: number;
  tokens: number;
  contentLength: number;
  correlationId: string;
}> {
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 10_000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const messages = buildMessages();

    const controller = new AbortController();
    const requestTimeoutMs = Number(process.env.TEST_REQUEST_TIMEOUT_MS) || 600_000;
    const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
    const start = performance.now();

    try {
      const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          stream,
          max_tokens: 4096,
          temperature: 0.3,
        }),
        signal: controller.signal,
      });

      const duration = performance.now() - start;
      clearTimeout(timeout);

      const correlationId = response.headers.get("x-correlation-id") || "?";
      let content = "";
      let finishReason = "unknown";
      let totalTokens = 0;

      if (stream) {
        const streamResult = await readSSEStream(response);
        content = streamResult.fullContent;
        finishReason = streamResult.finishReason;
        totalTokens = streamResult.totalTokens;
      } else {
        const json = await response.json().catch(() => ({}));
        const choice = json?.choices?.[0];
        content = choice?.message?.content || "";
        finishReason = choice?.finish_reason || "unknown";
        totalTokens = json?.usage?.total_tokens || 0;
      }

      const msPerToken = totalTokens > 0 ? (duration / totalTokens).toFixed(1) : "?";

      console.log(
        `  ${tcName.padEnd(45)} ` +
          `HTTP ${response.status} | ` +
          `${Math.round(duration).toString().padStart(5)}ms | ` +
          `${String(messages.length).padStart(2)} msgs | ` +
          `${String(totalTokens).padStart(5)} tok | ` +
          `${msPerToken.padStart(4)} ms/tok | ` +
          `finish: ${finishReason} | ` +
          `response: ${content.length} chars | ` +
          `cid: ${correlationId}`
      );

      if (response.status === 200) {
        if (content.length > 0) {
          assert.ok(
            finishReason === "stop" || finishReason === "length",
            `expected stop/length finish, got ${finishReason}`
          );
        } else {
          assert.fail(`  ${tcName.padEnd(45)} WARNING: empty content returned`);
        }
      } else if ((response.status === 503 || response.status === 429) && attempt < MAX_RETRIES) {
        console.log(
          `  ${tcName.padEnd(45)} RETRY ${attempt}/${MAX_RETRIES} after ${response.status} (waiting ${RETRY_DELAY_MS / 1000}s)`
        );
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        continue;
      } else {
        const errorBody = await response.text().catch(() => "unknown");
        assert.fail(`HTTP ${response.status}: ${errorBody}`);
      }

      return {
        status: response.status,
        duration,
        tokens: totalTokens,
        contentLength: content.length,
        correlationId,
      };
    } catch (err) {
      clearTimeout(timeout);
      const errorMessage = err instanceof Error ? err.message : String(err);
      if ((errorMessage.includes("503") || errorMessage.includes("429")) && attempt < MAX_RETRIES) {
        console.log(
          `  ${tcName.padEnd(45)} RETRY ${attempt}/${MAX_RETRIES} after error (waiting ${RETRY_DELAY_MS / 1000}s)`
        );
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        continue;
      }
      console.log(`  ${tcName.padEnd(45)} FAILED: ${errorMessage}`);
      throw err;
    }
  }
  throw new Error("Max retries exceeded");
}

// --------------------------------------------------------------------------
// CASE_BUILDERS: 25 named payload generators (shared by streaming + non-streaming)
// --------------------------------------------------------------------------

export const CASE_BUILDERS = [
  { name: "basic coding question", build: (): Message[] => [genSystemMessage(), genUserMessage()] },
  {
    name: "code review request",
    build: (): Message[] => [genSystemMessage(), genCodeReviewMessage()],
  },
  {
    name: "long document analysis",
    build: (): Message[] => [genSystemMessage(), genLongDocMessage()],
  },
  { name: "direct question no system", build: (): Message[] => [genUserMessage()] },
  {
    name: "agentic planning task",
    build: (): Message[] => [genSystemMessage(), genAgenticTaskMessage()],
  },
  { name: "agentic 3-turn conversation", build: (): Message[] => genMultiTurnConversation(3) },
  { name: "agentic 5-turn conversation", build: (): Message[] => genMultiTurnConversation(5) },
  { name: "agentic 2-turn conversation", build: (): Message[] => genMultiTurnConversation(2) },
  { name: "agentic 4-turn conversation", build: (): Message[] => genMultiTurnConversation(4) },
  { name: "agentic 6-turn conversation", build: (): Message[] => genMultiTurnConversation(6) },
  { name: "code conversation with review", build: (): Message[] => genCodeConversation() },
  {
    name: "code review with long doc",
    build: (): Message[] => [
      genSystemMessage(),
      genLongDocMessage(),
      {
        role: "user",
        content: `Now let's apply this to actual code. Optimize this:\n${pick(CODE_BLOCKS)}`,
      },
    ],
  },
  {
    name: "multi-part coding task",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `First, let me understand the problem. I need to build a webhook processor.\n\n${pick(CODE_BLOCKS)}\n\nActually, let me also consider the monitoring aspects after the initial implementation.`,
      },
      {
        role: "assistant",
        content:
          "Let me outline the architecture for a robust webhook processor. The key components are:\n\n1. **Ingestion endpoint**: Validates signatures, deduplicates, queues\n2. **Processing pipeline**: Routes to handlers based on event type\n3. **Retry logic**: Exponential backoff with dead letter queue\n4. **Monitoring**: Metrics for throughput, latency, error rates\n\nHere's a detailed design...",
      },
      {
        role: "user",
        content:
          "Great breakdown. Now let's focus on the retry logic specifically. I need it to handle different error types differently: 4xx should not retry, 5xx should retry up to 3 times, and network errors should retry up to 5 times with shorter intervals.",
      },
    ],
  },
  {
    name: "debugging session simulation",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `I'm seeing this error in production and I can't figure out the root cause:\n\n\`\`\`\nError: EMFILE: too many open files\n    at FSReqCallback.open (node:fs:249)\n    at Object.openSync (node:fs:466)\n    at Object.readFileSync (node:fs:355)\n\`\`\`\n\nThis happens intermittently under load. The service processes file uploads.`,
      },
      {
        role: "assistant",
        content:
          "The EMFILE error occurs when a process exceeds the file descriptor limit. Let me help you debug this systematically:\n\n1. **Check the current limit**: `ulimit -n` shows the soft limit\n2. **Find descriptor leaks**: Use `lsof -p <PID>` to list open files\n3. **Common causes**:\n   - Streams not properly closed after processing\n   - Database connections not returned to pool\n   - File handles held by garbage collector\n\nMost likely you're opening file streams in your upload handler without properly closing them in all code paths (especially error paths).",
      },
      {
        role: "user",
        content:
          "You're right, I found it! We were using `fs.readFileSync` in a middleware but not catching errors — on validation failures the file handle was leaking. What's the best pattern to prevent this?",
      },
      {
        role: "assistant",
        content:
          "Great find! Here's the recommended pattern:\n\n```typescript\nimport { open, readFile, unlink } from 'fs/promises';\n\nasync function processUpload(path: string) {\n  let file;\n  try {\n    file = await open(path, 'r');\n    const data = await readFile(file);\n    // validate and process\n  } finally {\n    await file?.close().catch(() => {});\n    await unlink(path).catch(() => {}); // cleanup temp file\n  }\n}\n```\n\nKey principles:\n- Always use `finally` for cleanup\n- Prefer async file operations\n- Use the file handle API (open → use → close) rather than one-shot methods for long-lived operations\n- Add file descriptor monitoring in production",
      },
      {
        role: "user",
        content:
          "Perfect, that's very clear. Now let me also think about monitoring — what metrics should we expose around file descriptors to catch this early next time?",
      },
    ],
  },
  {
    name: "architecture discussion with trade-offs",
    build: (): Message[] => [
      genSystemMessage(),
      genLongDocMessage(),
      {
        role: "assistant",
        content:
          "Based on the document, I can extract the following key insights about distributed systems design...\n\n1. **CAP theorem trade-offs** need careful evaluation based on your specific use case\n2. **Consensus algorithms** like Raft provide strong consistency but at latency cost\n3. **Event-driven architectures** offer scalability but require careful handling of eventual consistency\n4. **CQRS + Event Sourcing** gives flexibility but adds operational complexity\n5. **Monitoring and observability** are critical in distributed systems",
      },
      {
        role: "user",
        content:
          "Given these insights, how would you architect a payment processing system that needs both strong consistency (for balances) and high availability (for the API)? This seems like the classic CAP dilemma applied to fintech.",
      },
    ],
  },
  {
    name: "JSON-heavy structured data prompt",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `Here's a JSON payload from our API. Transform it into a different structure and explain your changes:\n\n${JSON.stringify(
          {
            event: "order.created",
            timestamp: new Date().toISOString(),
            data: {
              orderId: `ord_${randomInt(100000, 999999)}`,
              customer: {
                id: `cus_${randomInt(10000, 99999)}`,
                tier: ["basic", "premium", "enterprise"][randomInt(0, 2)],
              },
              items: Array.from({ length: randomInt(3, 8) }, (_, i) => ({
                sku: `SKU-${String(i + 1).padStart(4, "0")}`,
                name: pick([
                  "Widget Pro",
                  "Deluxe Gadget",
                  "Basic Tool",
                  "Premium Service",
                  "Add-on Pack",
                ]),
                quantity: randomInt(1, 5),
                price: parseFloat((Math.random() * 200 + 5).toFixed(2)),
              })),
              total: 0,
              shipping: {
                method: pick(["standard", "express", "overnight"]),
                address: {
                  street: "123 Main St",
                  city: "San Francisco",
                  state: "CA",
                  zip: "94105",
                },
              },
              payment: { method: pick(["card", "wallet", "invoice"]), status: "pending" },
            },
          },
          null,
          2
        )}`,
      },
    ],
  },
  {
    name: "markdown formatting prompt",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `# Architecture Review Request

## Project Overview
We are building a **real-time collaboration platform** similar to Google Docs but for code editing.

## Requirements
1. Real-time sync using **CRDTs** (not OT)
2. **Multi-cursor** support with presence awareness
3. **Offline-first** with conflict resolution
4. **Plugin system** for extensions

## Questions
1. What's the best CRDT implementation for this use case?
2. How do we handle **large documents** (100k+ lines)?
3. What's the **performance budget** for sync operations?

## Current Stack
| Component | Technology | Status |
|-----------|------------|--------|
| Frontend | React + Monaco Editor | POC done |
| Sync Layer | Yjs | POC done |
| Backend | Node.js + WebSockets | In progress |
| Storage | PostgreSQL | Planned |
| Auth | OAuth 2.0 + JWT | Done |

Please provide a detailed analysis with code examples.`,
      },
    ],
  },
  {
    name: "multi-part instructions with constraints",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `I need you to solve this problem with specific constraints:

PROBLEM: Design a rate-limited API proxy that:
1. Routes requests to different backends based on path prefix
2. Enforces per-tenant rate limits (100 req/s per tenant)
3. Caches responses with configurable TTL
4. Logs all requests with timing data

CONSTRAINTS:
- Must handle 50k req/s peak
- P99 latency must stay under 50ms
- No single point of failure
- Must support gradual rollout

Please provide:
1. Architecture diagram (ASCII art)
2. Data structures
3. Key algorithms
4. Trade-offs`,
      },
    ],
  },
  {
    name: "debugging with stack trace",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `I'm getting this error in production. Help me debug it:\n\n\`\`\`\nTypeError: Cannot read properties of undefined (reading 'map')\n    at transformResponse (/app/src/services/transformer.ts:142:23)\n    at processResponse (/app/src/middleware/response.ts:89:14)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async handleRequest (/app/src/router/index.ts:234:18)\n    at async Server.handle (/app/src/server.ts:56:22)\n\`\`\`\n\nThe relevant code at line 142:\n\`\`\`typescript\nconst transformed = response.data.items.map(item => ({\n  id: item.id,\n  name: item.attributes.name,\n  price: item.attributes.price,\n}));\n\`\`\`\n\nI think the issue is that \`response.data.items\` is sometimes undefined. What's the best way to handle this? Should I validate the response shape, use optional chaining, or something else?`,
      },
    ],
  },
  {
    name: "comparative analysis request",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `Compare these three approaches to handling async operations in JavaScript/TypeScript. For each, provide:\n1. A concrete code example\n2. Error handling strategy\n3. Performance characteristics\n4. When to use it\n\n**Approach 1: Callbacks**\n**Approach 2: Promises with async/await**\n**Approach 3: Observables (RxJS)**\n\nI'm specifically interested in:\n- How cancellation works in each\n- Memory implications for long-lived operations\n- Composability (combining multiple async operations)`,
      },
    ],
  },
  {
    name: "very long single user message",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `I need a comprehensive analysis of the following topics. Please address each one in detail:\n\n${LONG_DOCUMENTS.join("\n\n---\n\n")}\n\nFor each section above, please:\n1. Summarize the key points\n2. Identify any logical gaps or missing information\n3. Suggest practical applications\n4. List follow-up questions that would deepen understanding`,
      },
    ],
  },
  {
    name: "system prompt + multi-part code task",
    build: (): Message[] => [
      {
        role: "system",
        content:
          "You are a strict code reviewer. Always point out potential bugs, security issues, and performance problems. Use specific line references.",
      },
      {
        role: "user",
        content: `Review this React component for production readiness:\n\n${pick(CODE_BLOCKS)}\n\n${pick(CODE_BLOCKS)}`,
      },
    ],
  },
  {
    name: "conversation with long assistant responses",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content:
          "Explain how modern CPU architectures handle branch prediction and speculative execution, including the security implications.",
      },
      {
        role: "assistant",
        content: `Modern CPU branch prediction is a fascinating and complex topic with significant security implications.

**How Branch Prediction Works**

Modern processors use deep pipelines (14-20 stages in modern x86 CPUs). To keep these pipelines full, they need to predict which way branches will go before the condition is actually evaluated. Processors maintain several structures:

1. **Branch Target Buffer (BTB)**: Caches the target address of recently executed branches. When a branch instruction is decoded, the BTB predicts the target.

2. **Branch History Table (BHT) / Pattern History Table (PHT)**: Tracks the recent outcomes of branches (taken/not taken) using 2-bit saturating counters. A branch that was taken twice in a row is likely to be taken again.

3. **Return Stack Buffer (RSB)**: A hardware stack that predicts return addresses for CALL/RET instructions. Since returns are indirect (the address depends on the call site), the RSB provides much better accuracy than the BTB for returns.

4. **Tournament Predictors**: Modern CPUs combine multiple prediction strategies (e.g., local predictor per branch, global predictor that considers branch history) and select the best performer. The Intel Pentium M's "Hybrid Predictor" and later "Perceptron Predictors" in some designs are examples.

**Speculative Execution**

Once a prediction is made, the CPU speculatively executes instructions along the predicted path before the branch condition is resolved. This includes:
- Computing addresses and loading data into cache
- Executing arithmetic operations
- Even writing to architectural state (though these are retired only if the prediction was correct)

If the prediction was wrong, the CPU must:
1. Flush the pipeline (discard all speculatively executed instructions)
2. Restore the architectural state to the checkpoint before the branch
3. Fetch from the correct path

The performance penalty for a misprediction is roughly 10-20 cycles on modern CPUs — hence the massive investment in accurate prediction.

**Security Implications: Spectre and Meltdown**

The problem is that speculative execution leaves side-effect traces in microarchitectural state, particularly the cache. Here's how Spectre Variant 1 (Bounds Check Bypass) works:

\`\`\`c
if (x < array1->length) {
    // Speculatively executed even when x is out of bounds
    value = array2[array1[x] * 4096];  // Cache-timing side channel
}
\`\`\`

By training the branch predictor to predict the bounds check will pass, an attacker can cause speculative access to arbitrary memory. The value read affects which cache line of array2 is loaded, which can be detected through timing measurements.

Mitigations include:
- **LFENCE serialization**: Insert serializing instructions after bounds checks (heavy overhead)
- **Retpolines**: Replace indirect branches with returns to confuse the BTB
- **Indirect Branch Restricted Speculation (IBRS)**: Hardware-level mitigation in newer CPUs
- **Single Thread Indirect Branch Predictor (STIBP)**: Prevents cross-hyperthread predictor interference

Meltdown (CVE-2018-3615) is a related but distinct attack where the CPU speculatively executes instructions after a fault (not a branch misprediction), allowing access to kernel memory from user space. This affects primarily Intel and some ARM cores.

**Modern Defenses**

Starting with Intel's "Security First" architecture (Ice Lake and later), hardware mitigations include:
- **Predictor tagging by privilege level**: Branch predictors are tagged with the CPL, preventing user-mode training from affecting kernel predictions
- **Hardware-enforced bounds checking**: Some instructions can be marked to prevent speculation past them
- **Mitigation-less performance**: Newer generations have reduced the performance impact of software mitigations from 30%+ to 2-5%`,
      },
      {
        role: "user",
        content: `That's a great overview. Now, zooming in on one specific aspect: how do Return Stack Buffer (RSB) and CALL/RET prediction work at the microarchitectural level? Specifically, how does the CPU handle:

1. Deeply nested function calls (e.g., recursive functions with 100+ levels)
2. Indirect function calls through function pointers
3. Return-oriented programming (ROP) exploits and how CET/Shadow Stack mitigates them

Also, can you explain the "RSB underflow" issue when switching between privilege levels?`,
      },
      {
        role: "assistant",
        content: `Excellent questions. Let me dive deep into each area.

**RSB Microarchitecture**

The Return Stack Buffer is a specialized predictor implemented as a circular buffer (typically 16-48 entries in modern CPUs). Each CALL instruction pushes the return address onto this hardware stack. Each RET instruction pops the top entry and uses it as the predicted target.

The key insight is that the RSB is a true stack — it naturally handles nested calls correctly, unlike the BTB which would confuse RET instructions that can have many different targets depending on context.

1. **Deeply Nested Calls (100+ levels)**:

When the nesting depth exceeds the RSB size:
- The bottom entries are simply overwritten (circular buffer behavior)
- On return beyond the RSB depth, the CPU experiences an **RSB underflow** — there's no valid prediction available
- The fallback mechanism varies by microarchitecture:
  - Intel Sandy Bridge and earlier: falls back to BTB prediction for RETs (poor accuracy)
  - Intel Haswell and later: uses a "return predictor" that's actually a secondary BTB trained on RET behavior
  - AMD Zen: uses a hybrid approach with a deeper RSB-like structure

2. **Indirect Calls Through Function Pointers**:

Modern CPUs handle indirect calls and returns quite differently:
- **Indirect calls** (CALL [rax]): predicted using the BTB, which stores mapping from the indirect call instruction address to the recently used target(s).
- **Indirect jumps** (JMP [rax]): same BTB mechanism
- **RET instructions**: predicted via RSB exclusively

3. **Return-Oriented Programming and CET**:

ROP works precisely because of how RSB prediction functions:
- The attacker finds small instruction sequences ("gadgets") ending in RET in existing code
- By overflowing the stack or corrupting the return address, the attacker chains these gadgets

**Control-flow Enforcement Technology (CET)**:

Intel CET provides two complementary protections:

a) **Shadow Stack (SHSTK)**: A separate, hardware-protected stack that shadows the return addresses pushed by CALL instructions. On RET, the CPU compares the return address from the regular stack with the shadow stack — any mismatch triggers a hardware exception.

b) **Indirect Branch Tracking (IBT)**: For indirect CALL and JMP instructions, the target must begin with an ENDBRANCH instruction. This prevents JOP/COP attacks.

**RSB Underflow Between Privilege Levels**:

When switching from a higher privilege level (kernel) to a lower one (user):
1. The CPU executes a SYSRET or IRET instruction
2. The RSB had entries from kernel-mode CALL instructions
3. These entries predict return addresses *within the kernel*
4. In user mode, the RSB may predict kernel addresses — speculatively executing kernel code from user space!

The mitigation (kernel RSB stuffing) involves executing 32 fake CALL instructions after transitioning to user mode, pushing and popping to overwrite the RSB entries with harmless addresses.`,
      },
      {
        role: "user",
        content:
          "Fascinating. One last question on this topic — how do AMD and ARM implementations compare to Intel's here? I'm particularly interested in ARM's PAC (Pointer Authentication) and how it differs from CET's shadow stack approach.",
      },
    ],
  },
  {
    name: "mixed content types in conversation",
    build: (): Message[] => [
      genSystemMessage(),
      {
        role: "user",
        content: `I need to process this data and then answer questions about it. First, here's the data:\n\n## System Configuration\n${JSON.stringify(
          {
            environment: "production",
            region: pick(["us-east-1", "eu-west-1", "ap-southeast-1"]),
            services: [
              { name: "api-gateway", replicas: 3, memory: "512Mi", cpu: "250m" },
              { name: "user-service", replicas: 5, memory: "1Gi", cpu: "500m" },
              { name: "payment-service", replicas: 2, memory: "2Gi", cpu: "1" },
              { name: "notification-service", replicas: 2, memory: "256Mi", cpu: "100m" },
            ],
            databases: [
              { name: "postgres-primary", type: "PostgreSQL", version: "16", storage: "500Gi" },
              { name: "redis-cache", type: "Redis", version: "7", storage: "50Gi" },
              { name: "clickhouse-analytics", type: "ClickHouse", version: "24", storage: "2Ti" },
            ],
            monitoring: {
              prometheus: { retention: "30d", storage: "200Gi" },
              grafana: { plugins: ["prometheus", "elasticsearch", "cloudwatch"] },
              alertmanager: { slack: true, pagerduty: true, email: true },
            },
          },
          null,
          2
        )}\n\nHere's a SQL query that aggregates the deployment data:\n\n${pick(CODE_BLOCKS)}`,
      },
      {
        role: "assistant",
        content:
          "I've analyzed your deployment configuration. Here are my observations:\n\n**Resource Allocation Analysis:**\n- Your API gateway has reasonable resource allocation for typical traffic patterns\n- The payment service has significant CPU allocation which suggests CPU-bound processing\n- Notification service appears under-provisioned if you handle high throughput\n\n**Potential Issues:**\n1. Single PostgreSQL primary is a single point of failure — consider read replicas\n2. No connection pooling configuration visible — pgbouncer recommended\n3. ClickHouse storage seems high — verify your data retention policies\n\n**Recommendations:**\n1. Add pod disruption budgets for production services\n2. Configure horizontal pod autoscaling with appropriate metrics\n3. Consider separating batch workloads onto spot instances",
      },
      {
        role: "user",
        content: `Great analysis. Now, let me give you some additional context and ask specific questions:\n\n1. We're seeing increased latency in the payment service during peak hours. The CPU usage goes to 80%+ and response times spike from 200ms to 2s. What should we investigate first?\n\n2. For the notification service, we're planning to scale from 2 to 10 replicas ahead of a Black Friday event. Besides increasing replicas, what else should we prepare?\n\n3. Looking at the SQL query in the config — that's actually a migration script that's running slowly. It takes 45 minutes on the primary. How would you optimize it without significant refactoring?`,
      },
      {
        role: "assistant",
        content:
          "Let me address each question:\n\n**1. Payment Service Latency**\n\nThe 2s spike at 80% CPU suggests CPU contention. Common causes:\n- Cryptography operations — consider caching\n- JSON serialization — use streaming\n- Synchronous database calls — verify connection pool settings\n\n**2. Black Friday Scaling for Notifications**\n\n- Pre-warm connection pools\n- Queue-based architecture with SQS/RabbitMQ\n- Rate limiting downstream API calls\n- Degrade gracefully with priority levels\n- Load test at 2x expected load\n\n**3. Slow Migration Query**\n\nBatch processing:\n```sql\nDO $$\nDECLARE\n  batch_size CONSTANT INTEGER := 10000;\nBEGIN\n  FOR i IN 0..(SELECT CEIL(COUNT(*)/batch_size) FROM target_table) LOOP\n    UPDATE target_table\n    SET processed = true\n    WHERE ctid IN (\n      SELECT ctid FROM target_table\n      WHERE processed IS false\n      LIMIT batch_size\n    );\n    COMMIT;\n    PERFORM pg_sleep(0.1);\n  END LOOP;\nEND $$;\n```",
      },
      {
        role: "user",
        content:
          "The batching approach for the migration seems most practical. One concern though — the migration also needs to backfill a new column based on data from a JOIN with another table that has 5M rows.",
      },
    ],
  },
  {
    name: "long context with repeated patterns",
    build: (): Message[] => [
      genSystemMessage(),
      ...Array.from({ length: 5 }, () => [
        {
          role: "user",
          content: `Consider this scenario in a microservices architecture: ${pick(AGENTIC_TASKS)}`,
        },
        {
          role: "assistant",
          content: `Here's my analysis of this scenario. The key considerations are scalability, fault tolerance, and operational complexity. Let me break this down...\n\n1. **Architecture**: We need to consider the overall system design and how components interact\n2. **Data flow**: Understanding how data moves through the system is critical\n3. **Failure modes**: Each component can fail in different ways\n4. **Monitoring**: We need observability at every layer\n\nThe recommended approach depends on your specific constraints around latency, throughput, and consistency requirements.`,
        },
      ]).flat(),
      {
        role: "user",
        content:
          "Now, given all the scenarios above, what common patterns do you see? Are there any cross-cutting concerns that appear in multiple scenarios?",
      },
    ],
  },
];
