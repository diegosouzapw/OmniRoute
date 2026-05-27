"use client";
import { Card } from "@/shared/components";

export default function DocumentationTab() {
  return (
    <Card className="p-6 space-y-6">
      <section>
        <h3 className="font-semibold mb-2">Proxy scope resolution</h3>
        <p className="text-sm text-text-muted">
          OmniRoute resolves the outbound proxy in priority order:
          <strong> combo → account → provider → global</strong>. The most specific scope wins.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Adding a custom proxy</h3>
        <p className="text-sm text-text-muted">
          Go to the <strong>Proxy Pool</strong> tab → click <em>+ Add proxy</em>. Fill in type
          (http/https/socks5), host, and port. Optionally assign it to a scope.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Bulk import format</h3>
        <pre className="text-xs bg-surface-alt/50 p-3 rounded mt-1 overflow-x-auto">
          {`http://user:pass@1.2.3.4:8080\nhttps://5.6.7.8:3128\nsocks5://9.0.1.2:1080`}
        </pre>
        <p className="text-sm text-text-muted mt-1">
          Pipe-delimited fields: <code>type|host|port|user|pass|name</code>
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">SOCKS5</h3>
        <p className="text-sm text-text-muted">
          SOCKS5 proxies are disabled by default. Set{" "}
          <code className="bg-surface-alt px-1 rounded">ENABLE_SOCKS5_PROXY=true</code> to enable.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Free Pool</h3>
        <p className="text-sm text-text-muted">
          The Free Pool tab aggregates proxies from 1proxy, Proxifly, and IPLocate. Use ⊕ to test
          and promote a proxy to your registry. Only proxies that pass the connectivity test are
          added.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Vercel Relay</h3>
        <p className="text-sm text-text-muted">
          The Vercel Relay is an outbound edge relay — not an inbound tunnel. Deploying one sends
          LLM API calls through Vercel&apos;s dynamic IPs, bypassing datacenter geo-blocks and rate
          limits. The relay is protected by a generated secret header (
          <code className="bg-surface-alt px-1 rounded">x-relay-auth</code>). Your Vercel token is
          used only during deploy and is never stored.
        </p>
      </section>
    </Card>
  );
}
