import { readFileSync } from "node:fs";

import { apiFetch, statusToExitCode } from "../api.mjs";
import { createPrompt, printError, printInfo, printSuccess } from "../io.mjs";
import { runOAuthStart } from "./oauth.mjs";

const ENV_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function credentialShape(value) {
  if (isBlank(value)) return { present: false, length: 0 };
  return { present: true, length: String(value).length };
}

const SENSITIVE_FIELD_SUFFIX_RE =
  /(?:^|_)(?:api_?key|access_key|secret_access_key|access_?token|refresh_?token|id_?token|auth_token|token|password|passphrase|secret|secret_key|secret_value|client_?secret|credential|authorization|private_key)$/;

function isSensitiveFieldName(key) {
  const normalized = String(key || "")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
  return SENSITIVE_FIELD_SUFFIX_RE.test(normalized);
}

/**
 * Redact provider responses before they reach human or JSON output.
 *
 * The API normally masks credentials, but the CLI must remain safe when an
 * operator enables a server-side reveal/debug option or when a compatible
 * remote implementation returns a raw field. Presence and length are useful
 * for diagnostics; the value itself must never be printed.
 */
export function redactProviderResponse(value, key = "") {
  if (isSensitiveFieldName(key)) {
    if (value === null || value === undefined || value === "") return null;
    return typeof value === "string" ? credentialShape(value) : "[redacted]";
  }
  if (Array.isArray(value)) return value.map((entry) => redactProviderResponse(entry));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([entryKey, entryValue]) => [
      entryKey,
      redactProviderResponse(entryValue, entryKey),
    ])
  );
}

/**
 * Extract a provider connection from the response returned by /api/providers.
 * The server deliberately masks credentials, so this helper never needs to
 * inspect or log a secret.
 */
export function findConnectionFromResponse(body, selector) {
  const rows = Array.isArray(body?.connections)
    ? body.connections
    : Array.isArray(body?.providers)
      ? body.providers
      : Array.isArray(body)
        ? body
        : [];
  const needle = String(selector || "")
    .trim()
    .toLowerCase();
  if (!needle) return null;

  const selectUnique = (matches) => {
    if (matches.length === 0) return null;
    if (matches.length === 1) return matches[0];
    const candidates = matches.map((row) => String(row?.id || "<missing-id>")).join(", ");
    throw new Error(`Provider connection selector '${selector}' is ambiguous: ${candidates}`);
  };

  const exactId = selectUnique(
    rows.filter((row) => String(row?.id || "").toLowerCase() === needle)
  );
  if (exactId) return exactId;
  const idPrefix = selectUnique(
    rows.filter((row) =>
      String(row?.id || "")
        .toLowerCase()
        .startsWith(needle)
    )
  );
  if (idPrefix) return idPrefix;
  const exactName = selectUnique(
    rows.filter((row) => String(row?.name || "").toLowerCase() === needle)
  );
  if (exactName) return exactName;
  return selectUnique(rows.filter((row) => String(row?.provider || "").toLowerCase() === needle));
}

/** Build the API body without accepting management auth as a provider secret. */
export function buildProviderPayload(provider, opts = {}, credential) {
  const body = {
    provider: String(provider || "").trim(),
    name: String(opts.name || provider || "").trim(),
  };
  if (!body.name) throw new Error("Provider name is required.");
  if (!isBlank(credential)) body.apiKey = String(credential);
  if (!isBlank(opts.defaultModel)) body.defaultModel = String(opts.defaultModel).trim();
  if (!isBlank(opts.priority)) {
    const priority = Number(opts.priority);
    if (!Number.isInteger(priority) || priority < 1) {
      throw new Error("--priority must be a positive integer.");
    }
    body.priority = priority;
  }
  if (opts.providerSpecificData) {
    const raw = typeof opts.providerSpecificData === "string" ? opts.providerSpecificData : null;
    try {
      const parsed = raw ? JSON.parse(raw) : opts.providerSpecificData;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("must be a JSON object");
      }
      body.providerSpecificData = parsed;
    } catch (error) {
      throw new Error(
        `--provider-specific-data must be a JSON object (${error instanceof Error ? error.message : String(error)})`
      );
    }
  }
  return body;
}

/** Resolve a credential from an explicit value, env reference, stdin, or prompt. */
export async function resolveProviderCredential(opts = {}, { prompt = true } = {}) {
  // Commander represents the negated `--no-credential` option as
  // `credential === false`. It is a control flag, never the literal provider
  // credential "false".
  if (opts.credential === false || opts.noCredential === true) return undefined;
  if (!isBlank(opts.credential)) return String(opts.credential).trim();

  const envName = String(opts.credentialEnv || opts["credential-env"] || "").trim();
  if (envName) {
    if (!ENV_NAME_RE.test(envName)) throw new Error("--credential-env must be a valid env name.");
    const value = process.env[envName];
    if (isBlank(value)) throw new Error(`Environment variable ${envName} is empty or unset.`);
    return String(value).trim();
  }

  if (opts.credentialStdin || opts["credential-stdin"]) {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    const value = chunks.join("").trim();
    if (!value) throw new Error("Credential stdin was empty.");
    return value;
  }

  if (!prompt) return undefined;
  const input = createPrompt();
  try {
    const value = await input.askSecret("Provider credential (hidden)");
    const trimmed = String(value || "").trim();
    if (!trimmed) throw new Error("Provider credential is required.");
    return trimmed;
  } finally {
    input.close();
  }
}

function targetOptions(opts = {}) {
  return {
    // Passing the global values through lets api.mjs apply its context-first
    // auth precedence. A caller-supplied --base-url remains an explicit target.
    baseUrl: opts.baseUrl,
    context: opts.context,
    apiKey: opts.apiKey,
    timeout: opts.timeout,
  };
}

async function readApiError(response) {
  try {
    const body = await response.json();
    const message = body?.error?.message || body?.error || body?.message;
    return message ? String(message) : `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

async function listRemoteConnections(opts) {
  return apiFetch("/api/providers?limit=5000", {
    ...targetOptions(opts),
    acceptNotOk: true,
    retry: false,
  });
}

async function resolveRemoteConnection(selector, opts) {
  const response = await listRemoteConnections(opts);
  if (!response.ok) {
    throw new Error(await readApiError(response));
  }
  const connection = findConnectionFromResponse(await response.json(), selector);
  if (!connection) throw new Error(`Provider connection not found: ${selector}`);
  return connection;
}

async function readRemoteConnectionById(id, opts) {
  const response = await apiFetch(`/api/providers/${encodeURIComponent(id)}`, {
    ...targetOptions(opts),
    acceptNotOk: true,
    retry: false,
  });
  if (!response.ok)
    throw new Error(`Provider mutation read-back failed: ${await readApiError(response)}`);
  const body = await response.json().catch(() => ({}));
  const connection = body?.connection;
  if (!connection || String(connection.id || "") !== String(id)) {
    throw new Error("Provider mutation read-back returned an unexpected connection.");
  }
  return connection;
}

async function confirmRemoteConnectionRemoved(id, opts) {
  const response = await apiFetch(`/api/providers/${encodeURIComponent(id)}`, {
    ...targetOptions(opts),
    acceptNotOk: true,
    retry: false,
  });
  if (response.status === 404) return;
  if (!response.ok) {
    throw new Error(`Provider removal read-back failed: ${await readApiError(response)}`);
  }
  const body = await response.json().catch(() => ({}));
  if (body?.connection) {
    throw new Error("Provider removal read-back found the connection still present.");
  }
  throw new Error("Provider removal read-back returned an unexpected success response.");
}

function verifyConnectionFields(connection, expected) {
  for (const [field, value] of Object.entries(expected)) {
    if (value !== undefined && connection?.[field] !== value) {
      throw new Error(`Provider mutation read-back did not persist field '${field}'.`);
    }
  }
  return connection;
}

export async function runProviderAddCommand(provider, opts = {}) {
  const normalized = String(provider || "").trim();
  if (!normalized) {
    printError("Provider id is required.");
    return 2;
  }
  if (opts.oauth) {
    if (opts.dryRun) {
      if (!opts.silent) {
        const preview = { action: "providers.auth", provider: normalized };
        if (opts.json) console.log(JSON.stringify(preview, null, 2));
        else printInfo(`dry-run: would start OAuth for ${normalized}`);
      }
      return 0;
    }
    return runOAuthStart({ ...opts, provider: normalized }, opts.command);
  }

  const allowNoCredential = Boolean(
    opts.allowNoCredential || opts.noCredential || opts.credential === false
  );
  let credential;
  try {
    credential = await resolveProviderCredential(opts, {
      prompt: !opts.dryRun && !opts.yes && !allowNoCredential,
    });
    if (!credential && !opts.dryRun && !allowNoCredential) {
      throw new Error(
        "Provider credential is required (use --credential-stdin or --credential-env)."
      );
    }
    const payload = buildProviderPayload(normalized, opts, credential);
    if (opts.dryRun) {
      const preview = {
        action: "providers.add",
        provider: payload.provider,
        name: payload.name,
        defaultModel: payload.defaultModel || null,
        credential: credentialShape(credential),
        providerSpecificData: payload.providerSpecificData
          ? redactProviderResponse(payload.providerSpecificData)
          : null,
      };
      if (!opts.silent) {
        if (opts.json) console.log(JSON.stringify(preview, null, 2));
        else printInfo(`dry-run: would add ${payload.provider}/${payload.name}`);
      }
      return 0;
    }

    const response = await apiFetch("/api/providers", {
      ...targetOptions(opts),
      method: "POST",
      body: payload,
      acceptNotOk: true,
      retry: false,
    });
    if (!response.ok) {
      printError(await readApiError(response));
      return statusToExitCode(response.status);
    }
    const body = await response.json().catch(() => ({}));
    const created = body?.connection;
    if (!created?.id) throw new Error("Provider create response did not include a connection id.");
    const verified = verifyConnectionFields(await readRemoteConnectionById(created.id, opts), {
      provider: payload.provider,
      name: payload.name,
      defaultModel: payload.defaultModel,
      priority: payload.priority,
    });
    if (!opts.silent) {
      if (opts.json) {
        console.log(JSON.stringify(redactProviderResponse({ connection: verified }), null, 2));
      } else printSuccess(`Added provider connection '${verified.name || payload.name}'.`);
    }
    return 0;
  } catch (error) {
    printError(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

export async function runProviderImportCommand(file, opts = {}) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    printError(
      `Cannot read provider import file: ${error instanceof Error ? error.message : String(error)}`
    );
    return 1;
  }
  const entries = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.providers)
      ? parsed.providers
      : [parsed];
  if (!entries.length) {
    printError("Provider import file contains no entries.");
    return 2;
  }
  const existingByProviderAndName = new Map();
  if (!opts.dryRun) {
    try {
      const response = await listRemoteConnections(opts);
      if (!response.ok) {
        printError(await readApiError(response));
        return statusToExitCode(response.status);
      }
      const body = await response.json().catch(() => ({}));
      const connections = Array.isArray(body?.connections) ? body.connections : [];
      for (const connection of connections) {
        const key = `${String(connection?.provider || "").toLowerCase()}\0${String(
          connection?.name || connection?.provider || ""
        ).toLowerCase()}`;
        if (!existingByProviderAndName.has(key)) {
          existingByProviderAndName.set(key, connection);
        }
      }
    } catch (error) {
      printError(error instanceof Error ? error.message : String(error));
      return 1;
    }
  }
  const results = [];
  for (const entry of entries) {
    if (!entry || typeof entry !== "object" || !entry.provider) {
      results.push({ ok: false, error: "entry.provider is required" });
      if (!opts.continueOnError) break;
      continue;
    }
    const provider = String(entry.provider).trim();
    const name = String(entry.name || provider).trim();
    const identityKey = `${provider.toLowerCase()}\0${name.toLowerCase()}`;
    const existing = existingByProviderAndName.get(identityKey);
    if (existing) {
      const result = {
        provider,
        name,
        ok: true,
        status: "skipped_existing",
        connectionId: existing.id,
      };
      results.push(result);
      if (!opts.json) printInfo(`Skipped existing provider connection '${name}'.`);
      continue;
    }
    // Import files contain provider data, never command/control-plane options.
    // Keep the management target, context and authentication exclusively from
    // the CLI invocation so an imported document cannot redirect credentials.
    const importedProviderOptions = {
      name: entry.name,
      defaultModel: entry.defaultModel,
      priority: entry.priority,
      providerSpecificData: entry.providerSpecificData,
      credential: entry.apiKey ?? entry.credential,
      allowNoCredential: entry.allowNoCredential ?? opts.allowNoCredential,
    };
    const code = await runProviderAddCommand(provider, {
      ...opts,
      ...importedProviderOptions,
      dryRun: opts.dryRun,
      yes: true,
      silent: true,
    });
    results.push({
      provider,
      name,
      ok: code === 0,
      code,
      status: code === 0 ? "created" : "error",
    });
    if (code === 0) existingByProviderAndName.set(identityKey, { provider, name });
    if (code !== 0 && !opts.continueOnError) break;
  }
  if (opts.json) console.log(JSON.stringify({ file, results }, null, 2));
  return results.every((result) => result.ok) ? 0 : 1;
}

async function confirmRemoval(label, opts) {
  if (opts.yes) return true;
  if (!process.stdin.isTTY) {
    printError(`Removal of '${label}' declined on non-interactive stdin; pass --yes to confirm.`);
    return false;
  }
  const prompt = createPrompt();
  try {
    const answer = await prompt.ask(`Remove provider connection '${label}'? [y/N] `);
    return /^y(?:es)?$/i.test(String(answer || "").trim());
  } finally {
    prompt.close();
  }
}

export async function runProviderRemoveCommand(selector, opts = {}) {
  if (!selector) {
    printError("Provider connection id, name, or provider is required.");
    return 2;
  }
  try {
    if (opts.dryRun) {
      const connection = await resolveRemoteConnection(selector, opts);
      if (opts.json) {
        console.log(
          JSON.stringify(
            redactProviderResponse({ action: "providers.remove", connection }),
            null,
            2
          )
        );
      } else printInfo(`dry-run: would remove ${connection.name || connection.id}`);
      return 0;
    }
    const connection = await resolveRemoteConnection(selector, opts);
    if (!(await confirmRemoval(connection.name || connection.id, opts))) return 0;
    const response = await apiFetch(`/api/providers/${encodeURIComponent(connection.id)}`, {
      ...targetOptions(opts),
      method: "DELETE",
      acceptNotOk: true,
      retry: false,
    });
    if (!response.ok) {
      printError(await readApiError(response));
      return statusToExitCode(response.status);
    }
    await confirmRemoteConnectionRemoved(connection.id, opts);
    if (opts.json)
      console.log(JSON.stringify(redactProviderResponse({ removed: connection }), null, 2));
    else printSuccess(`Removed provider connection '${connection.name || connection.id}'.`);
    return 0;
  } catch (error) {
    printError(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

export async function runProviderEditCommand(selector, opts = {}) {
  if (opts.active === true && opts.inactive === true) {
    printError("--active and --inactive cannot be used together.");
    return 2;
  }
  let parsedPriority;
  if (opts.priority !== undefined) {
    parsedPriority = Number(opts.priority);
    if (!Number.isInteger(parsedPriority) || parsedPriority < 1) {
      printError("--priority must be a positive integer.");
      return 2;
    }
  }
  try {
    const connection = await resolveRemoteConnection(selector, opts);
    const body = {};
    if (opts.name !== undefined) body.name = opts.name;
    if (opts.defaultModel !== undefined) body.defaultModel = opts.defaultModel || null;
    if (parsedPriority !== undefined) body.priority = parsedPriority;
    if (opts.active !== undefined) body.isActive = Boolean(opts.active);
    if (opts.inactive !== undefined) body.isActive = false;
    const credential = await resolveProviderCredential(opts, { prompt: false });
    if (credential) body.apiKey = credential;
    if (Object.keys(body).length === 0) {
      printError(
        "At least one edit field is required (--name, --default-model, --priority, --active/--inactive, or credential)."
      );
      return 2;
    }
    if (opts.dryRun) {
      const preview = {
        action: "providers.edit",
        connection: redactProviderResponse(connection),
        changes: { ...body, apiKey: credentialShape(body.apiKey) },
      };
      if (opts.json) console.log(JSON.stringify(preview, null, 2));
      else printInfo(`dry-run: would edit ${connection.name || connection.id}`);
      return 0;
    }
    const response = await apiFetch(`/api/providers/${encodeURIComponent(connection.id)}`, {
      ...targetOptions(opts),
      method: "PUT",
      body,
      acceptNotOk: true,
      retry: false,
    });
    if (!response.ok) {
      printError(await readApiError(response));
      return statusToExitCode(response.status);
    }
    await response.json().catch(() => ({}));
    const expected = { ...body };
    delete expected.apiKey;
    const verified = verifyConnectionFields(
      await readRemoteConnectionById(connection.id, opts),
      expected
    );
    if (opts.json) {
      console.log(JSON.stringify(redactProviderResponse({ connection: verified }), null, 2));
    } else printSuccess(`Updated provider connection '${connection.name || connection.id}'.`);
    return 0;
  } catch (error) {
    printError(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

export async function runProviderAuthCommand(provider, opts = {}, cmd) {
  return runOAuthStart({ ...opts, provider }, cmd);
}

export function registerProviderCrud(providers) {
  providers
    .command("add <provider>")
    .description("Add an API-key provider connection through the active local/remote server")
    .option("--name <name>", "Connection name (defaults to provider id)")
    .option(
      "--credential <key>",
      "Provider credential (prefer --credential-stdin or --credential-env)"
    )
    .option("--credential-env <name>", "Read provider credential from an environment variable")
    .option("--credential-stdin", "Read provider credential from stdin")
    .option("--allow-no-credential", "Allow providers whose catalog marks the credential optional")
    .option("--no-credential", "Allow providers whose catalog marks the credential optional")
    .option("--default-model <id>", "Default model for this connection")
    .option("--priority <n>", "Connection priority", Number)
    .option("--provider-specific-data <json>", "Provider-specific settings as a JSON object")
    .option("--oauth", "Start the provider's existing OAuth flow instead")
    .option("--yes", "Do not prompt for a credential")
    .option("--dry-run", "Preview the request without writing")
    .option("--json", "Print machine-readable output")
    .action(async (provider, opts, cmd) => {
      const code = await runProviderAddCommand(provider, {
        ...cmd.parent.optsWithGlobals(),
        ...opts,
        command: cmd,
      });
      if (code !== 0) process.exit(code);
    });

  providers
    .command("import <file>")
    .description("Import provider connections from a JSON file")
    .option("--continue-on-error", "Continue importing after a failed entry")
    .option("--dry-run", "Preview requests without writing")
    .option("--json", "Print machine-readable output")
    .action(async (file, opts, cmd) => {
      const code = await runProviderImportCommand(file, {
        ...cmd.parent.optsWithGlobals(),
        ...opts,
      });
      if (code !== 0) process.exit(code);
    });

  providers
    .command("auth <provider>")
    .description("Start an existing OAuth flow for a provider")
    .option("--no-browser", "Print the authorization URL instead of opening a browser")
    .option("--import-from-system", "Import credentials from the local system when supported")
    .option("--social <provider>", "Use a social-login flow when supported")
    .option("--timeout <ms>", "OAuth timeout", Number, 300000)
    .action(async (provider, opts, cmd) => {
      const code = await runProviderAuthCommand(
        provider,
        { ...cmd.parent.optsWithGlobals(), ...opts },
        cmd
      );
      if (code !== 0) process.exit(code);
    });

  providers
    .command("remove <idOrName>")
    .description("Remove one provider connection from the active local/remote server")
    .option("--yes", "Confirm removal")
    .option("--dry-run", "Preview the removal without writing")
    .option("--json", "Print machine-readable output")
    .action(async (idOrName, opts, cmd) => {
      const code = await runProviderRemoveCommand(idOrName, {
        ...cmd.parent.optsWithGlobals(),
        ...opts,
      });
      if (code !== 0) process.exit(code);
    });

  providers
    .command("edit <idOrName>")
    .description("Edit one provider connection on the active local/remote server")
    .option("--name <name>", "New connection name")
    .option("--default-model <id>", "New default model")
    .option("--priority <n>", "New connection priority", Number)
    .option("--active", "Activate the connection")
    .option("--inactive", "Deactivate the connection")
    .option("--credential <key>", "Replace provider credential")
    .option("--credential-env <name>", "Read replacement credential from an environment variable")
    .option("--credential-stdin", "Read replacement credential from stdin")
    .option("--dry-run", "Preview the edit without writing")
    .option("--json", "Print machine-readable output")
    .action(async (idOrName, opts, cmd) => {
      const code = await runProviderEditCommand(idOrName, {
        ...cmd.parent.optsWithGlobals(),
        ...opts,
      });
      if (code !== 0) process.exit(code);
    });
}
