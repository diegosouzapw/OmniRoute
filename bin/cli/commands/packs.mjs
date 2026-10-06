import path from "node:path";
import { fileURLToPath } from "node:url";

import { t } from "../i18n.mjs";
import { resolveDataDir } from "../data-dir.mjs";
import {
  EXIT_CODES,
  emit,
  exitWith,
  printError,
  printInfo,
  printSuccess,
  printWarning,
} from "../output.mjs";
import { findPack } from "../../../scripts/packs/optionalPackManifest.mjs";
import {
  findPackIndexFile,
  installPack,
  listPackStates,
  packState,
  packsRoot,
  readPackIndex,
  removePack,
} from "../../../scripts/packs/optionalPackInstaller.mjs";

const CLI_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/**
 * Locate + parse the bundle-shipped `optional-packs.index.json`.
 * Search order: explicit --source dir, then walking up from the CLI module
 * (bundle installs keep the index at the bundle root), then cwd.
 */
function loadIndex(sourceDir) {
  const indexFile = findPackIndexFile([sourceDir, CLI_DIR, process.cwd()]);
  if (!indexFile) return { indexFile: null, index: null };
  return { indexFile, index: readPackIndex(indexFile) };
}

function stateRow(state, dataDir) {
  return {
    pack: state.name,
    packVersion: state.packVersion,
    installed: state.installed ? "yes" : "no",
    verified: state.verified === null ? "-" : state.verified ? "ok" : "FAILED",
    members: state.members.length,
    installDir: path.join(packsRoot(dataDir), state.name),
    errors: state.errors ?? [],
  };
}

const STATE_SCHEMA = [
  { key: "pack", header: "pack" },
  { key: "packVersion", header: "packVersion" },
  { key: "installed", header: "installed" },
  { key: "verified", header: "verified" },
  { key: "members", header: "members" },
];

async function run(action) {
  try {
    await action();
  } catch (err) {
    exitWith(EXIT_CODES.ERROR, err instanceof Error ? err.message : String(err));
  }
}

export function registerPacks(program) {
  const packs = program.command("packs").description(t("packs.description"));

  packs
    .command("list")
    .description(t("packs.listDescription"))
    .option("--source <dir>", t("packs.sourceOpt"))
    .action(async (opts) => {
      await run(async () => {
        const dataDir = resolveDataDir();
        const { index } = loadIndex(opts.source);
        emit(
          (await listPackStates({ dataDir, index })).map((s) => stateRow(s, dataDir)),
          opts,
          STATE_SCHEMA
        );
        if (!index) printWarning(t("packs.warnNoIndex"));
      });
    });

  packs
    .command("install <name>")
    .description(t("packs.installDescription"))
    .option("--source <dir>", t("packs.sourceOpt"))
    .action(async (name, opts) => {
      await run(async () => {
        if (!findPack(name)) exitWith(EXIT_CODES.INVALID_ARG, t("packs.errUnknown", { name }));
        const { indexFile, index } = loadIndex(opts.source);
        if (!index) exitWith(EXIT_CODES.ERROR, t("packs.errNoIndex"));
        const dataDir = resolveDataDir();
        // The payload (tarball or extracted pack dir) lives next to the index
        // unless the caller pointed elsewhere via --source.
        await installPack(name, {
          dataDir,
          index,
          sourceDir: opts.source || path.dirname(indexFile),
          log: (msg) => printInfo(msg.replace(/^\[optional-packs\]\s*/, "")),
        });
        const installDir = path.join(packsRoot(dataDir), name);
        printSuccess(t("packs.installed", { name, dir: installDir }));
        printInfo(t("packs.restartHint"));
        emit({ pack: name, installed: "yes", verified: "ok", installDir }, opts, STATE_SCHEMA);
      });
    });

  packs
    .command("verify [name]")
    .description(t("packs.verifyDescription"))
    .option("--source <dir>", t("packs.sourceOpt"))
    .action(async (name, opts) => {
      await run(async () => {
        if (name && !findPack(name))
          exitWith(EXIT_CODES.INVALID_ARG, t("packs.errUnknown", { name }));
        const { index } = loadIndex(opts.source);
        if (!index) exitWith(EXIT_CODES.ERROR, t("packs.errNoIndex"));
        const dataDir = resolveDataDir();
        const states = name
          ? [await packState(name, { dataDir, index })]
          : await listPackStates({ dataDir, index });
        emit(
          states.map((s) => stateRow(s, dataDir)),
          opts,
          STATE_SCHEMA
        );
        const broken = states.filter((s) => s.installed && s.verified !== true);
        if (broken.length > 0) {
          for (const state of broken) {
            for (const error of state.errors ?? []) printError(`${state.name}: ${error}`);
          }
          exitWith(EXIT_CODES.ERROR, t("packs.verifyFailed", { count: broken.length }));
        }
        if (!states.some((s) => s.installed)) {
          printInfo(t("packs.noneInstalled"));
          return;
        }
        printSuccess(t("packs.verifyOk"));
      });
    });

  packs
    .command("remove <name>")
    .description(t("packs.removeDescription"))
    .action(async (name, opts) => {
      await run(async () => {
        if (!findPack(name)) exitWith(EXIT_CODES.INVALID_ARG, t("packs.errUnknown", { name }));
        const dataDir = resolveDataDir();
        const removed = removePack(name, {
          dataDir,
          log: (msg) => printInfo(msg.replace(/^\[optional-packs\]\s*/, "")),
        });
        if (removed) {
          printSuccess(t("packs.removed", { name }));
          printInfo(t("packs.restartHint"));
        } else {
          printInfo(t("packs.notInstalled", { name }));
        }
        emit({ pack: name, installed: removed ? "no" : "no" }, opts, STATE_SCHEMA);
      });
    });
}
