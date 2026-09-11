# Windows helpers — run OmniRoute from a source checkout

Two double-clickable `.bat` files for Windows users who cloned the repo instead of
installing the npm package. Both resolve the repo root from their own location, so they
work from any checkout path.

| File                  | What it does                                                                       |
| --------------------- | ---------------------------------------------------------------------------------- |
| `start-omniroute.bat` | `npm run dev` — dev server + dashboard on `http://localhost:20128`                 |
| `launch-claude.bat`   | `node bin\omniroute.mjs launch` — opens Claude Code pointed at the local OmniRoute |

Usage:

1. `npm install` once (see the note below if you are on npm ≥ 11).
2. Double-click `start-omniroute.bat` and wait for `dev server listening on http://0.0.0.0:20128`.
3. Open the dashboard, connect a provider, copy an API key from **Endpoints**.
4. Double-click `launch-claude.bat`. Extra arguments are forwarded, e.g.
   `launch-claude.bat --profile glm52` after `node bin\omniroute.mjs setup-claude`.

## npm ≥ 11 skips `better-sqlite3` on Windows

`better-sqlite3` is an `optionalDependency`. npm 11 blocks install scripts of optional
dependencies by default, so on a fresh clone `node_modules/better-sqlite3/` may simply not
exist. The server still boots (it falls back to `node:sqlite`, which Node marks
experimental), but `npm run dev` logs `Module not found: Can't resolve 'better-sqlite3'`
and `[DB] Driver: node:sqlite`.

Since `better-sqlite3@13` ships prebuilt binaries inside the package
(`prebuilds/win32-x64.node`), no compiler is needed — just put the package in place:

```powershell
cd node_modules
npm pack better-sqlite3@13.0.3
tar -xzf better-sqlite3-13.0.3.tgz
Remove-Item -Recurse -Force better-sqlite3 -ErrorAction SilentlyContinue
Rename-Item package better-sqlite3
Remove-Item better-sqlite3-13.0.3.tgz
```

Restart the server; the log should now read `[DB] Driver: better-sqlite3`.

> If you do need to compile a native addon and `python` resolves to the Microsoft Store
> build, `node-gyp` fails with `common.gypi not found` even after downloading headers — the
> Store Python sandboxes `%LOCALAPPDATA%`. Pass `--devdir` pointing outside `AppData\Local`
> (or install python.org Python).
