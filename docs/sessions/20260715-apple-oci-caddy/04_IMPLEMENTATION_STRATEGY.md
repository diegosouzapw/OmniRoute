# Implementation Strategy

The verifier runs the pinned OCI images directly rather than translating the Caddy topology
into an engine-specific compose dialect. One adapter surface is shared by Apple `container`,
Docker, and Podman. Unique names, an isolated network, a temporary document root, and an EXIT
trap make concurrent or interrupted runs deterministic.
