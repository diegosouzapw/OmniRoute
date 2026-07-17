# Known Issues

- The repository already had a Taskfile before this change, so this session is a refinement rather than
  a greenfield addition.
- The repo contains secondary Python manifests under subdirectories, but the root Go module remains the
  primary build surface.
- Local validation still shows repo/environment blockers in the Go toolchain path:
  - `task build` fails on missing `go.sum` entries and the generated package `api/graphql/gen`.
  - The local Go cache/toolchain emitted missing standard-library cache errors during `go test` and
    `golangci-lint`.
