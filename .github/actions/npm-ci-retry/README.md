# npm ci with retry

This action installs the checkout dependencies with up to three attempts and restores a node_modules tree only when its complete cache key matches. Node, npm, lockfile, project npm configuration, postinstall helpers and the action itself participate in the key. Cached and freshly installed trees still pass the existing native-runtime verification.

The installation step sets `ONNXRUNTIME_NODE_INSTALL=skip` before invoking npm. ONNX Runtime reads this environment variable directly, so skipping its additional CUDA installation does not depend on npm forwarding the custom `.npmrc` key. The repository retains that key temporarily; its npm warning can therefore remain.

## Installing this checkout locally

For a POSIX shell, set the variable on the install command:

```sh
ONNXRUNTIME_NODE_INSTALL=skip npm ci
```

Use `npm install` in place of `npm ci` when deliberately updating the lockfile.

In PowerShell, set it in the current shell before starting npm:

```powershell
$env:ONNXRUNTIME_NODE_INSTALL = "skip"
npm ci
```

The PowerShell assignment remains in that process environment and is inherited by its children. npm does not load the application's `.env` file for this purpose. A package preinstall script cannot set the environment of its parent npm process.

## Scope

The environment is scoped to this action's install step. Direct checkout-install steps in the enumerated workflows set the same variable themselves. It is not exported to unrelated workflow steps or changed for tarball smoke tests.

The Dockerfile checkout install already uses `--ignore-scripts`, then builds only the SQLite native dependency; that path does not execute the ONNX install script.

This policy does not force an environment variable on people installing the published package, on remote deployment commands, or inside a separate container. The checkout `.npmrc` is also not a configuration mechanism for those consumers. Those installation paths have their own contracts. The regression tests exercise the ONNX flag parser and a local npm lifecycle without downloading CUDA, installing the application or claiming to reproduce a startup crash.
