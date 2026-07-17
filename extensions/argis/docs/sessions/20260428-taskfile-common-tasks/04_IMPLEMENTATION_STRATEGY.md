# Implementation Strategy

Keep the existing Taskfile structure because it already matches the requested task shape.

Refinement:
- Add a default task so `task` resolves to the main build entrypoint.
- Make `clean` switch on the detected language instead of using one Go-only cleanup path.
- Keep the existing language detection shape, but scope it to root manifests so nested subprojects do
  not override the primary repo language.
- Treat `go.work` as a Go root manifest when present, and keep `go.mod` as the current repo signal.
- Give `golangci-lint` a five-minute timeout so lint failures reflect code or dependency issues
  instead of the default linter timeout.
- Keep Go cleanup focused on the test cache and repo-local build or coverage directories, avoiding
  global build-cache deletion that can fail while other Go processes are active.
