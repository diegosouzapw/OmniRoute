---
title: "Local Proxy-Core Configuration"
---

# Local proxy-core configuration (opt-in)

This subscription field generates a local-core config file. Empty (default)
means no generation: sync behaves exactly as before.

- Set **Core config file** to the absolute path of the adopted sing-box
  config (lowercase `.json` extension, e.g.
  `/var/lib/omniroute/sing-box/config.json`).
- Each sync renders the model and writes `<path>.generated` **beside** the
  adopted file with an atomic, symlink-refusing write (mode 0600). Without a
  core binary on the host the adopted file is never modified.
- **Verified replacement (host opt-in).** When the host environment sets
  `OMNIROUTE_PROXY_CORE_BINARY_PATH` to the absolute path of a core binary
  (today only a file named `sing-box`), each sync checks the rendered text
  with `<binary> check -c <candidate>` (no shell, 10 s timeout) and, only
  after a pass, atomically replaces the adopted file, keeping the previous
  one as `<path>.prev`. A failed check or replace leaves the adopted file in
  place and writes `<path>.generated` with a warning. The binary path is
  read from the environment only: it is never stored in the database and
  the management API refuses a `coreBinaryPath` field, because the binary is
  executed (Hard Rule #15).
- Only sections whose tags start with `omniroute-` are owned: owned entries
  are removed then replaced, everything else (`dns`, `log`,
  `experimental/clash_api`, user rules and outbounds, unknown keys) is kept
  verbatim. Only sing-box is rendered so far.
- Refused without writing: unparseable JSON, a non-object root, or a file
  with neither an `inbounds` nor an `outbounds` array. Nodes whose source
  isn't sing-box-shaped are skipped with a reason, never converted.
- Failures and refusals surface as a sync warning and never fail the sync.
  When an earlier warning already owns the sync status, generation is
  skipped and the skip is logged server-side. Removing the subscription
  removes its `<path>.generated` copy and never the adopted file (the
  operator's live core configuration); changing the path leaves any
  previously written `.generated` file in place.
- The last switch line shows the refusal motive that fired it; live switch
  activity is also visible in the application log under [SelectorControl].
- Without any selector group the model stays empty: nodes are neither
  rendered nor listed. The switch reason shows as a generic label (quota,
  unreachable, transport, slow).
