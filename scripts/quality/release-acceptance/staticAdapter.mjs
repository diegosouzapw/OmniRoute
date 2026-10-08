export function adaptCompiler({ commandId, inputDigest, exitCode, diagnostics }) {
  const diags = Array.isArray(diagnostics) ? diagnostics : [];
  const digest = typeof inputDigest === "string" ? inputDigest : "";
  if (exitCode === 0 && digest.length > 0) {
    return {
      command_id: commandId,
      input_digest: digest,
      exit_code: 0,
      diagnostics: diags,
      status: "PASS",
    };
  }
  if (exitCode === 0 && digest.length === 0) {
    return {
      command_id: commandId,
      input_digest: digest,
      exit_code: 0,
      diagnostics: diags,
      status: "INFRA_ERROR",
    };
  }
  return {
    command_id: commandId,
    input_digest: digest,
    exit_code: exitCode,
    diagnostics: diags,
    status: "FAIL",
  };
}

export function adaptScript({ commandId, inputDigest, exitCode, stdout }) {
  const digest = typeof inputDigest === "string" ? inputDigest : "";
  let parsed = null;
  if (typeof stdout === "string" && stdout.trim()) {
    try {
      parsed = JSON.parse(stdout);
    } catch {
      parsed = null;
    }
  }
  const diagnostics = parsed ?? { input_digest: digest, exit_code: exitCode, diagnostics: stdout ?? "" };
  const status = exitCode === 0 ? (digest ? "PASS" : "INFRA_ERROR") : "FAIL";
  return {
    command_id: commandId,
    input_digest: digest,
    exit_code: exitCode,
    diagnostics,
    status,
  };
}
