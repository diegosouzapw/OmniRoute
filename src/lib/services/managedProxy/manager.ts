import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { resolveDataDir } from "@/lib/dataPaths";
import { encrypt, decrypt, isEncryptionEnabled, looksEncrypted } from "@/lib/db/encryption";
import { readPrivateConfigFile, writePrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import {
  renderManagedConfig,
  sourceOutbound,
  type ManagedCore,
  type ManagedListener,
} from "./config";
import { installManagedCore } from "./install";
import type { allocatePort, checkNative, startManaged, stopManaged } from "./runtime";

const EntrySchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1).max(120),
    port: z.number().int().min(1).max(65535),
    sourceEnc: z.string().startsWith("enc:v1:"),
  })
  .strict();
const ManifestSchema = z
  .object({ version: z.literal(1), entries: z.array(EntrySchema).max(100) })
  .strict();
type Entry = z.infer<typeof EntrySchema>;
const locks = new Map<string, Promise<unknown>>();

export function managedRoot(): string {
  return path.join(resolveDataDir(), "services", "managed-proxy");
}

function ensureDirectory(root: string): void {
  fs.mkdirSync(root, { recursive: true, mode: 0o700 });
  let current = path.resolve(root);
  while (true) {
    if (fs.lstatSync(current).isSymbolicLink())
      throw new Error("Managed directory ancestors must not be links");
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
}

function readOptional(file: string): string | null {
  try {
    return readPrivateConfigFile(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export function readManagedManifest(text: string | null): Entry[] {
  return text ? ManifestSchema.parse(JSON.parse(text)).entries : [];
}

export function managedListeners(core: ManagedCore, entries: Entry[]): ManagedListener[] {
  return entries.map((entry) => {
    const source = decrypt(entry.sourceEnc);
    if (!source || looksEncrypted(source))
      throw new Error("Managed proxy source cannot be decrypted; verify STORAGE_ENCRYPTION_KEY");
    return { id: entry.id, port: entry.port, outbound: sourceOutbound(core, source) };
  });
}

export async function withManagedLock<T>(
  _core: ManagedCore,
  root: string,
  action: () => Promise<T>
): Promise<T> {
  // Port allocation and persisted listeners are shared by both cores.
  const key = root;
  const previous = locks.get(key) || Promise.resolve();
  const next = previous.catch(() => {}).then(action);
  locks.set(key, next);
  try {
    return await next;
  } finally {
    if (locks.get(key) === next) locks.delete(key);
  }
}

export function managedEntries(core: ManagedCore, root = managedRoot()) {
  return readManagedManifest(readOptional(path.join(root, core, "sources.json"))).map(
    ({ id, name, port }) => ({ id, name, core, port })
  );
}

export type ManagedSave = { core: ManagedCore; name: string; sourceLink: string; id?: string };
export type ActivationDependencies = {
  install: typeof installManagedCore;
  check: typeof checkNative;
  start: typeof startManaged;
  stop: typeof stopManaged;
  allocate: typeof allocatePort;
  running?: (core: ManagedCore) => boolean;
};
async function runtimeDependencies(): Promise<ActivationDependencies> {
  const { allocatePort, checkNative, startManaged, stopManaged, isManagedRunning } =
    await import("./runtime");
  return {
    install: installManagedCore,
    check: checkNative,
    start: startManaged,
    stop: stopManaged,
    allocate: allocatePort,
    running: isManagedRunning,
  };
}

function restoreFile(file: string, content: string | null): void {
  if (content === null) fs.rmSync(file, { force: true });
  else writePrivateConfigFile(file, content);
}

type SaveSnapshot = {
  core: ManagedCore;
  executable: string;
  configPath: string;
  manifestPath: string;
  activationPath: string;
  oldConfig: string | null;
  oldManifest: string | null;
  oldActivation: string | null;
  wasRunning: boolean;
  priorListeners: ManagedListener[];
};
async function restoreSave(snapshot: SaveSnapshot, deps: ActivationDependencies): Promise<void> {
  const {
    core,
    executable,
    configPath,
    manifestPath,
    activationPath,
    oldConfig,
    oldManifest,
    oldActivation,
    wasRunning,
    priorListeners,
  } = snapshot;
  try {
    await deps.stop(core);
    restoreFile(configPath, oldConfig);
    restoreFile(manifestPath, oldManifest);
    restoreFile(activationPath, oldActivation);
    if (wasRunning && oldConfig && priorListeners.length)
      await deps.start(core, executable, configPath, priorListeners);
  } catch {
    throw new Error(
      "Managed proxy save failed and prior core could not be restored; assignments were not changed"
    );
  }
}

/** Registry callback MUST be one transaction and is the last fallible activation operation. */
export async function saveManagedProxy<T>(
  input: ManagedSave,
  commit: (entry: { id: string; name: string; port: number; core: ManagedCore }) => Promise<T>,
  root = managedRoot(),
  dependencies?: ActivationDependencies
): Promise<T> {
  // Reject unsupported source options before any download or config write.
  sourceOutbound(input.core, input.sourceLink);
  if (!isEncryptionEnabled())
    throw new Error("STORAGE_ENCRYPTION_KEY is required for managed proxy sources");
  const sourceEnc = encrypt(input.sourceLink);
  if (typeof sourceEnc !== "string" || !looksEncrypted(sourceEnc))
    throw new Error("Managed proxy source encryption failed");
  const deps = dependencies || (await runtimeDependencies());
  return withManagedLock(input.core, root, async () => {
    ensureDirectory(root);
    const directory = path.join(root, input.core);
    ensureDirectory(directory);
    const manifestPath = path.join(directory, "sources.json");
    const configPath = path.join(directory, "config.json");
    const oldManifest = readOptional(manifestPath);
    const oldConfig = readOptional(configPath);
    const activationPath = path.join(directory, "activation.json");
    const oldActivation = readOptional(activationPath);
    const entries = readManagedManifest(oldManifest);
    const existing = input.id ? entries.find((entry) => entry.id === input.id) : undefined;
    if (input.id && !existing) throw new Error("Managed proxy not found for selected core");
    const priorListeners = entries.length ? managedListeners(input.core, entries) : [];
    const wasRunning = deps.running?.(input.core) ?? false;
    const id = existing?.id || randomUUID();
    const opposite = input.core === "singbox" ? "xray" : "singbox";
    const oppositeEntries = readManagedManifest(
      readOptional(path.join(root, opposite, "sources.json"))
    );
    const port =
      existing?.port ||
      (await deps.allocate(new Set([...entries, ...oppositeEntries].map((entry) => entry.port))));
    const candidate = { id, name: input.name, port, sourceEnc };
    const nextEntries = existing
      ? entries.map((entry) => (entry.id === id ? candidate : entry))
      : [...entries, candidate];
    ManifestSchema.parse({ version: 1, entries: nextEntries });
    const nextListeners = managedListeners(input.core, nextEntries);
    const config = JSON.stringify(renderManagedConfig(input.core, nextListeners), null, 2) + "\n";
    const executable = await deps.install(input.core, root);
    const candidatePath = path.join(directory, `candidate-${randomUUID()}.json`);
    let replaced = false;
    try {
      writePrivateConfigFile(candidatePath, config);
      await deps.check(input.core, executable, candidatePath);
      await deps.stop(input.core);
      replaced = true;
      writePrivateConfigFile(configPath, config);
      await deps.start(input.core, executable, configPath, nextListeners);
      const manifestText = JSON.stringify({ version: 1, entries: nextEntries }) + "\n";
      writePrivateConfigFile(manifestPath, manifestText);
      writePrivateConfigFile(activationPath, JSON.stringify({ enabled: true }));
      return await commit({ id, name: input.name, port, core: input.core });
    } catch (error) {
      if (replaced)
        await restoreSave(
          {
            core: input.core,
            executable,
            configPath,
            manifestPath,
            activationPath,
            oldConfig,
            oldManifest,
            oldActivation,
            wasRunning,
            priorListeners,
          },
          deps
        );
      throw error;
    } finally {
      fs.rmSync(candidatePath, { force: true });
    }
  });
}

export async function stopManagedProxyCore(core: ManagedCore, root = managedRoot()): Promise<void> {
  const { stop } = await runtimeDependencies();
  await withManagedLock(core, root, async () => {
    await stop(core);
    ensureDirectory(path.join(root, core));
    writePrivateConfigFile(
      path.join(root, core, "activation.json"),
      JSON.stringify({ enabled: false })
    );
  });
}

export async function startManagedProxyCore(
  core: ManagedCore,
  root = managedRoot(),
  restoreOnly = false
): Promise<void> {
  await withManagedLock(core, root, async () => {
    const entries = readManagedManifest(readOptional(path.join(root, core, "sources.json")));
    if (!entries.length) throw new Error("Save a managed proxy before starting its core");
    const active = managedListeners(core, entries);
    const executable = await installManagedCore(core, root, !restoreOnly);
    const configPath = path.join(root, core, "config.json");
    const deps = await runtimeDependencies();
    await deps.check(core, executable, configPath);
    await deps.start(core, executable, configPath, active);
    writePrivateConfigFile(
      path.join(root, core, "activation.json"),
      JSON.stringify({ enabled: true })
    );
  });
}

export async function restoreManagedProxyCores(root = managedRoot()): Promise<void> {
  for (const core of ["singbox", "xray"] as ManagedCore[]) {
    try {
      const activation = readOptional(path.join(root, core, "activation.json"));
      if (
        !activation ||
        JSON.parse(activation).enabled !== true ||
        !managedEntries(core, root).length
      )
        continue;
      await startManagedProxyCore(core, root, true);
    } catch {
      const { logger } = await import("@/shared/utils/logger");
      logger.error(
        { module: "managed-proxy", core },
        "Saved managed core could not be restored; re-save its source to repair"
      );
    }
  }
}
