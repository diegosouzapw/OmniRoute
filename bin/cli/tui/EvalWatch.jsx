import React, { useState, useEffect, useCallback } from "react";
import { render, Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { ProgressBar } from "../tui-components/ProgressBar.jsx";
import { StatusBadge } from "../tui-components/StatusBadge.jsx";
import { DataTable } from "../tui-components/DataTable.jsx";
import { HeaderSwr } from "../tui-components/HeaderSwr.jsx";

const TERMINAL_STATUSES = new Set(["completed", "failed", "cancelled"]);

const RESULT_SCHEMA = [
  { key: "idx", header: "#", width: 5 },
  { key: "status", header: "Status", width: 10, formatter: (v) => (v === "pass" ? "✔" : "✖") },
  { key: "model", header: "Model", width: 22 },
  { key: "score", header: "Score", width: 8, formatter: (v) => (v != null ? String(v) : "-") },
  { key: "latencyMs", header: "ms", width: 8, formatter: (v) => (v != null ? String(v) : "-") },
];

function EvalWatchApp({ runId, suiteId, baseUrl, apiKey, onExit }) {
  const [run, setRun] = useState(null);
  const [results, setResults] = useState([]);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const fetchUrl = `${baseUrl ?? "http://localhost:20128"}/api/evals/${runId}`;
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fetcher = useCallback(async () => {
    if (paused) return null;
    const res = await fetch(fetchUrl, { headers });
    if (!res.ok) return null;
    return res.json();
  }, [fetchUrl, paused]);

  useEffect(() => {
    if (!run) return;
    if (TERMINAL_STATUSES.has(run.status)) {
      setDone(true);
    }
    const samples = run.samples ?? run.results ?? [];
    setResults(
      samples.map((s, i) => ({
        idx: i + 1,
        status: s.pass ? "pass" : "fail",
        model: s.model ?? "-",
        score: s.score,
        latencyMs: s.latencyMs,
      }))
    );
  }, [run]);

  useInput((input, key) => {
    if (input === "q" || (key.ctrl && input === "c")) onExit?.();
    if (input === "p") setPaused((p) => !p);
  });

  const total = run?.progress?.total ?? 0;
  const completed = run?.progress?.completed ?? 0;
  const passed = run?.progress?.passed ?? results.filter((r) => r.status === "pass").length;
  const failed = run?.progress?.failed ?? results.filter((r) => r.status === "fail").length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" paddingX={1} paddingY={1}>
      <Box marginBottom={1} justifyContent="space-between">
        <Text bold color="cyan">
          Eval Watch — Run {runId}
          {suiteId ? ` (suite: ${suiteId})` : ""}
        </Text>
        <Text dimColor>
          {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
          {paused ? " [PAUSED]" : ""}
        </Text>
      </Box>

      <HeaderSwr
        fetcher={fetcher}
        interval={done ? 0 : 3000}
        render={(data) => {
          if (data && data !== run) setRun(data);
          return null;
        }}
        initial={null}
      />

      {run ? (
        <>
          <Box marginBottom={1}>
            <StatusBadge
              status={
                run.status === "running" ? "running" : run.status === "completed" ? "ok" : "error"
              }
            />
            <Text> {run.status} </Text>
            <Text dimColor>
              {completed}/{total || "?"} samples
            </Text>
          </Box>

          {total > 0 && (
            <Box marginBottom={1} flexDirection="column">
              <ProgressBar value={pct} total={100} color="cyan" />
              <Box marginTop={0}>
                <Text color="green">✔ {passed} passed</Text>
                <Text> </Text>
                <Text color="red">✖ {failed} failed</Text>
              </Box>
            </Box>
          )}

          {results.length > 0 && (
            <Box flexDirection="column" marginTop={1}>
              <Text bold dimColor>
                Recent results
              </Text>
              <DataTable rows={results.slice(-10)} schema={RESULT_SCHEMA} />
            </Box>
          )}

          {done && (
            <Box marginTop={1}>
              <Text bold color={run.status === "completed" ? "green" : "red"}>
                {run.status === "completed"
                  ? `✔ Eval completed — ${passed}/${total} passed`
                  : `✖ Eval ${run.status}`}
              </Text>
            </Box>
          )}
        </>
      ) : (
        <Box>
          <Text color="green">
            <Spinner type="dots" />
          </Text>
          <Text> Loading...</Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text dimColor>[q] quit [p] {paused ? "resume" : "pause"}</Text>
      </Box>
    </Box>
  );
}

export async function startEvalWatchTui({ runId, suiteId, baseUrl, apiKey }) {
  return new Promise((resolve, reject) => {
    function onExit() {
      unmount();
      resolve();
    }

    const { unmount, waitUntilExit } = render(
      <EvalWatchApp
        runId={runId}
        suiteId={suiteId}
        baseUrl={baseUrl}
        apiKey={apiKey}
        onExit={onExit}
      />
    );

    waitUntilExit().then(resolve).catch(reject);
  });
}
