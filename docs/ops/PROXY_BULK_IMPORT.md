---
title: "Named bulk proxy import"
description: "Import direct proxies with explicit names while preserving existing formats."
---

# Named bulk proxy import

In the dashboard proxy registry, open the existing bulk-import dialog, paste one proxy per line,
review the parsed preview, then import. You can provide a name at the end of a host-first line:

```text
socks5://gateway.example.invalid:12000:session-1:example-password:UK 1
socks5://gateway.example.invalid:12001:session-2:example-password:UK 2
https://gateway.example.invalid:12002:session-3:example-password:UK 3
```

The last field is the proxy name; it may contain spaces or non-ASCII characters. These are synthetic
examples, not usable credentials. Supported direct protocols are `http`, `https`, and `socks5`.
IPv6 literals use brackets, for example `[2001:db8::1]` in place of the host.

This is a custom colon-delimited import format, not a standard proxy URI. Fields must not contain
colons; use the existing pipe-delimited form when a username, password or name contains a colon:

```text
UK 1|gateway.example.invalid|12000|example-user|example:password|socks5
```

Empty names, invalid ports and ambiguous extra fields are rejected in the preview. Ports must be
integers from 1 to 65535. Error entries report the line and reason, not the submitted credentials.
Existing unnamed shorthand, protocol-header, user-info and pipe-delimited formats remain supported.
Names do not change the registry's existing credential-aware proxy identity or routing assignments.
This addition does not install a tunnel core or enable a new global proxy scope.
