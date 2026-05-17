import React, { useState, useEffect, useCallback } from "react";
import { render, Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { DataTable } from "../tui-components/DataTable.jsx";
import { ProgressBar } from "../tui-components/ProgressBar.jsx";

const STATUS = {
  PENDING: "pending",
  RUNNING: "running",
  PASS: "pass",
  FAIL: "fail",
  SKIP: "skip",
};

const TABLE_SCHEMA = [
  { key: "provider", header: "Provider", width: 28 },
  { key: "model", header: "Model", width: 32 },
  {
    key: "status",
    header: "Status",
    width: 10,
    formatter: (v) => {
      if (v === STATUS.RUNNING) return "…";
      if (v === STATUS.PASS) return "✔";
      if (v === STATUS.FAIL) return "✖";
      if (v === STATUS.SKIP) return "—";
      return "·";
    },
  },
  { key: "latencyMs", header: "ms", width: 8, formatter: (v) => (v != null ? String(v) : "-") },
  { key: "error", header: "Error", width: 28, formatter: (v) => (v ? v.slice(0, 26) : "") },
];

async function testOne(provider, model, baseUrl, apiKey) {
  const headers = {
    "Content-Type": "application/json",
    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
  };
  const start = Date.now();
  try {
    const res = await fetch(`${baseUrl}/api/v1/providers/test`, {
      method: "POST",
      headers,
      body: JSON.stringify({ provider, model }),
      signal: AbortSignal.timeout(30000),
    });
    const latencyMs = Date.now() - start;
    const data = res.ok ? await res.json() : { success: false, error: `HTTP ${res.status}` };
    return { status: data.success ? STATUS.PASS : STATUS.FAIL, latencyMs, error: data.error };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      status: STATUS.FAIL,
      latencyMs: Date.now() - start,
      error: msg.slice(0, 100),
    };
  }
}

function ProvidersTestAllApp({ providers, baseUrl, apiKey, concurrency = 4, onExit }) {
  const resolved = `${baseUrl ?? "http://localhost:20128"}`;

  const [rows, setRows] = useState(() =>
    providers.map((p, i) => ({
      id: i,
      provider: p.provider ?? p.id ?? String(p),
      model: p.model ?? p.defaultModel ?? "",
      status: STATUS.PENDING,
      latencyMs: null,
      error: null,
    }))
  );
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const update = useCallback((id, patch) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  useEffect(() => {
    if (started) return;
    setStarted(true);

    async function runAll() {
      const queue = [...rows];
      let running = 0;
      let cursor = 0;

      function nextSlot() {
        while (running < concurrency && cursor < queue.length) {
          const row = queue[cursor++];
          running++;
          update(row.id, { status: STATUS.RUNNING });
          testOne(row.provider, row.model, resolved, apiKey).then((result) => {
            update(row.id, result);
            running--;
            nextSlot();
            if (cursor >= queue.length && running === 0) setDone(true);
          });
        }
      }

      nextSlot();
    }

    runAll();
  }, []);

  useInput((input, key) => {
    if (input === "q" || (key.ctrl && input === "c")) onExit?.();
  });

  const total = rows.length;
  const completed = rows.filter((r) => r.status === STATUS.PASS || r.status === STATUS.FAIL).length;
  const passed = rows.filter((r) => r.status === STATUS.PASS).length;
  const failed = rows.filter((r) => r.status === STATUS.FAIL).length;
  const running = rows.filter((r) => r.status === STATUS.RUNNING).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" paddingX={1} paddingY={1}>
      <Box marginBottom={1} justifyContent="space-between">
        <Text bold color="cyan">
          Providers Test All
        </Text>
        <Text dimColor>
          {running > 0 ? (
            <>
              <Spinner type="dots" /> {running} running
            </>
          ) : done ? (
            "done"
          ) : (
            "queued"
          )}
        </Text>
      </Box>

      <Box marginBottom={1} flexDirection="column">
        <ProgressBar value={pct} total={100} color={done && failed > 0 ? "red" : "cyan"} />
        <Box marginTop={0}>
          <Text>
            {completed}/{total}
          </Text>
          <Text> </Text>
          <Text color="green">✔ {passed}</Text>
          <Text> </Text>
          <Text color="red">✖ {failed}</Text>
        </Box>
      </Box>

      <DataTable rows={rows} schema={TABLE_SCHEMA} />

      {done && (
        <Box marginTop={1}>
          <Text bold color={failed === 0 ? "green" : "yellow"}>
            {failed === 0
              ? `All ${passed} providers passed!`
              : `${passed} passed, ${failed} failed`}
          </Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text dimColor>[q] quit</Text>
      </Box>
    </Box>
  );
}

export async function startProvidersTestTui({ providers, baseUrl, apiKey, concurrency = 4 }) {
  return new Promise((resolve, reject) => {
    function onExit() {
      unmount();
      resolve();
    }

    const { unmount, waitUntilExit } = render(
      <ProvidersTestAllApp
        providers={providers}
        baseUrl={baseUrl}
        apiKey={apiKey}
        concurrency={concurrency}
        onExit={onExit}
      />
    );

    waitUntilExit().then(resolve).catch(reject);
  });
}
