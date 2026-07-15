# DAG and WBS

```text
kernel registration -> arm64 boot -> static Caddy validation
                                      |
                         mock upstreams + network
                                      |
                         health/API/UI assertions
                                      |
                              cleanup + evidence
```

Machine status is recorded in `artifacts/static.env` and `artifacts/runtime.env`.
