// Fixture used by tests/unit/issue-13538-tray-crash-diagnostics-lost.test.ts:
// a minimal "server" that always exits non-zero immediately, simulating a
// gateway process that repeatedly crashes under load.
process.exit(1);
