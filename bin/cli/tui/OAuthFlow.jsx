import React, { useState, useEffect } from "react";
import { render, Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { StatusBadge } from "../tui-components/StatusBadge.jsx";
import { ConfirmDialog } from "../tui-components/ConfirmDialog.jsx";

const PHASE = {
  WAITING: "waiting",
  POLLING: "polling",
  DONE: "done",
  FAILED: "failed",
  CANCELLED: "cancelled",
};

let _globalDone = null;
let _globalFail = null;

function OAuthFlowApp({ provider, url, deviceCode, onCancel, onDone, onFail }) {
  const [phase, setPhase] = useState(PHASE.WAITING);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    _globalDone = (res) => {
      setResult(res);
      setPhase(PHASE.DONE);
      onDone?.(res);
    };
    _globalFail = (err) => {
      setError(typeof err === "string" ? err : (err?.message ?? String(err)));
      setPhase(PHASE.FAILED);
      onFail?.(err);
    };
    setPhase(PHASE.POLLING);
    return () => {
      _globalDone = null;
      _globalFail = null;
    };
  }, []);

  useInput((input, key) => {
    if (phase === PHASE.DONE || phase === PHASE.FAILED || phase === PHASE.CANCELLED) return;
    if (input === "q" || (key.ctrl && input === "c")) {
      setConfirmCancel(true);
    }
  });

  function handleCancelConfirm(yes) {
    setConfirmCancel(false);
    if (yes) {
      setPhase(PHASE.CANCELLED);
      onCancel?.();
    }
  }

  const elapsed_str = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  if (confirmCancel) {
    return (
      <Box flexDirection="column" padding={1}>
        <ConfirmDialog
          message="Cancel OAuth authorization?"
          onConfirm={handleCancelConfirm}
          defaultNo
        />
      </Box>
    );
  }

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" paddingX={2} paddingY={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          OmniRoute OAuth — {provider}
        </Text>
      </Box>

      {url && (
        <Box flexDirection="column" marginBottom={1}>
          <Text>Open this URL in your browser to authorize:</Text>
          <Box marginTop={0}>
            <Text bold color="yellow">
              {url}
            </Text>
          </Box>
        </Box>
      )}

      {deviceCode && (
        <Box flexDirection="column" marginBottom={1}>
          <Text>
            Device code:{" "}
            <Text bold color="yellow">
              {deviceCode}
            </Text>
          </Text>
        </Box>
      )}

      <Box marginTop={1}>
        {phase === PHASE.POLLING || phase === PHASE.WAITING ? (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text> Waiting for authorization... </Text>
            <Text dimColor>({elapsed_str})</Text>
          </Box>
        ) : phase === PHASE.DONE ? (
          <Box>
            <StatusBadge status="ok" />
            <Text> Authorized: {result?.email ?? result?.account ?? "connected"}</Text>
          </Box>
        ) : phase === PHASE.FAILED ? (
          <Box>
            <StatusBadge status="error" />
            <Text> Failed: {error}</Text>
          </Box>
        ) : (
          <Box>
            <StatusBadge status="warn" />
            <Text> Cancelled.</Text>
          </Box>
        )}
      </Box>

      {(phase === PHASE.POLLING || phase === PHASE.WAITING) && (
        <Box marginTop={1}>
          <Text dimColor>[q] cancel</Text>
        </Box>
      )}
    </Box>
  );
}

export async function startOAuthTui({ provider, url, deviceCode }) {
  return new Promise((resolve, reject) => {
    let resolved = false;

    function onDone(result) {
      if (resolved) return;
      resolved = true;
      unmount();
      resolve({ status: "authorized", result });
    }

    function onFail(err) {
      if (resolved) return;
      resolved = true;
      unmount();
      resolve({ status: "failed", error: err });
    }

    function onCancel() {
      if (resolved) return;
      resolved = true;
      unmount();
      resolve({ status: "cancelled" });
    }

    const { unmount, waitUntilExit } = render(
      <OAuthFlowApp
        provider={provider}
        url={url}
        deviceCode={deviceCode}
        onDone={onDone}
        onFail={onFail}
        onCancel={onCancel}
      />
    );

    waitUntilExit()
      .then(() => {
        if (!resolved) resolve({ status: "exited" });
      })
      .catch(reject);
  });
}

export function markOAuthDone(result) {
  _globalDone?.(result);
}

export function markOAuthFailed(error) {
  _globalFail?.(error);
}
