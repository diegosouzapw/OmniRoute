# Research

- `container system status` reported the Apple apiserver running.
- `container system kernel set --recommended --force` is the supported recovery for the
  partial prior download that left the kernel file without default registration.
- Boot proof: `container run --rm docker.io/library/alpine:3.21 uname -a` returned an
  `aarch64 Linux` kernel.
- `deploy/Caddyfile` uses `/v1/models` for active upstream health checks.
