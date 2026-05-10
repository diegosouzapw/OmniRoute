export function parseArgs(argv = []) {
  const flags = {};
  const positionals = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg.startsWith("-") && !arg.startsWith("--") && arg.length > 1) {
      for (const key of arg.slice(1)) {
        flags[key] = true;
      }
      continue;
    }

    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }

    const eqIndex = arg.indexOf("=");
    if (eqIndex !== -1) {
      flags[arg.slice(2, eqIndex)] = arg.slice(eqIndex + 1);
      continue;
    }

    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      flags[key] = next;
      i += 1;
    } else {
      flags[key] = true;
    }
  }

  return { flags, positionals };
}

export function getStringFlag(flags, name, envName = null) {
  const value = flags[name] ?? (envName ? process.env[envName] : undefined);
  if (typeof value !== "string") return "";
  return value.trim();
}

export function hasFlag(flags, name) {
  return flags[name] === true;
}
