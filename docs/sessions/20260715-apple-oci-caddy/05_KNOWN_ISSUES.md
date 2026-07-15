# Known Issues

- First execution may spend time fetching Caddy and BusyBox OCI images.
- External termination that cannot execute shell traps may leave uniquely prefixed resources;
  their names start with `omniroute-caddy-`.
- Runtime proof covers the Caddy topology with mock services, not the full OmniRoute image.
