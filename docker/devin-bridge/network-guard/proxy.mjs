import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import { pathToFileURL } from "node:url";

import {
  isAllowedGuardHostname,
  parseConnectAuthority,
  parseTlsClientHelloSni,
  sanitizeForwardHeaders,
} from "./policy.mjs";

const MAX_CLIENT_HELLO_BYTES = 64 * 1024;
const CLIENT_HELLO_TIMEOUT_MS = 3000;

export function createGuardProxy({
  policy = "deny-all",
  logPath = "/tmp/egress.jsonl",
  allowHostname = (hostname) => isAllowedGuardHostname(hostname, policy),
  connectSocket = (port, hostname, onConnect) => net.connect(port, hostname, onConnect),
} = {}) {
  if (!new Set(["deny-all", "devin"]).has(policy)) {
    throw new Error(`Unknown network guard policy: ${policy}`);
  }

  function audit(hostname, decision, reason) {
    fs.appendFileSync(
      logPath,
      `${JSON.stringify({ at: new Date().toISOString(), hostname, decision, reason })}\n`
    );
  }

  const server = http.createServer((req, res) => {
    let target;
    try {
      target = new URL(req.url);
    } catch {
      res.writeHead(400).end("invalid proxy target\n");
      return;
    }
    if (target.protocol !== "http:" || target.username || target.password) {
      audit(target.hostname, "deny", "invalid_http_target");
      res.writeHead(403).end("egress denied\n");
      return;
    }
    if (!allowHostname(target.hostname)) {
      audit(target.hostname, "deny", "host_policy");
      res.writeHead(403).end("egress denied\n");
      return;
    }
    audit(target.hostname, "allow", "host_policy");
    const upstream = http.request(
      target,
      {
        method: req.method,
        headers: sanitizeForwardHeaders(req.headers, target),
      },
      (reply) => {
        res.writeHead(reply.statusCode || 502, reply.headers);
        reply.pipe(res);
      }
    );
    req.pipe(upstream);
    upstream.on("error", () => res.writeHead(502).end("upstream error\n"));
  });

  server.on("connect", (req, client, head) => {
    const authority = parseConnectAuthority(req.url);
    if (!authority) {
      audit(req.url, "deny", "invalid_connect_authority");
      client.end("HTTP/1.1 403 Forbidden\r\n\r\n");
      return;
    }
    const { hostname, port } = authority;
    if (!allowHostname(hostname)) {
      audit(hostname, "deny", "host_policy");
      client.end("HTTP/1.1 403 Forbidden\r\n\r\n");
      return;
    }

    let buffer = Buffer.from(head);
    let settled = false;
    const timer = setTimeout(() => fail("client_hello_timeout"), CLIENT_HELLO_TIMEOUT_MS);
    timer.unref?.();

    const cleanup = () => {
      clearTimeout(timer);
      client.removeListener("data", onData);
    };
    const fail = (reason) => {
      if (settled) return;
      settled = true;
      cleanup();
      audit(hostname, "deny", reason);
      client.destroy();
    };
    const inspect = () => {
      if (buffer.length > MAX_CLIENT_HELLO_BYTES) return fail("client_hello_too_large");
      const parsed = parseTlsClientHelloSni(buffer);
      if (parsed.status === "need-more") return;
      if (parsed.status !== "ok") return fail(parsed.reason || "invalid_client_hello");
      if (parsed.serverName !== hostname) return fail("sni_mismatch");
      settled = true;
      cleanup();
      client.pause();
      const upstream = connectSocket(port, hostname, () => {
        audit(hostname, "allow", "sni_match");
        if (buffer.length) upstream.write(buffer);
        upstream.pipe(client);
        client.pipe(upstream);
        client.resume();
      });
      upstream.on("error", () => client.destroy());
    };
    const onData = (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      inspect();
    };

    client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    client.on("data", onData);
    if (buffer.length) inspect();
    client.resume();
  });

  return server;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const [host, portText] = (process.env.GUARD_LISTEN || "0.0.0.0:8080").split(":");
  const server = createGuardProxy({
    policy: process.env.GUARD_POLICY || "deny-all",
    logPath: process.env.GUARD_LOG || "/tmp/egress.jsonl",
  });
  server.listen(Number(portText), host);
}
