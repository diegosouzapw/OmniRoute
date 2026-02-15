"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardSkeleton } from "@/shared/components";
import { AI_PROVIDERS } from "@/shared/constants/providers";

export default function HomePageClient({ machineId }) {
  const [providerConnections, setProviderConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState("/v1");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}/v1`);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [connRes] = await Promise.all([fetch("/api/connections")]);
      if (connRes.ok) {
        const connData = await connRes.json();
        setProviderConnections(connData);
      }
    } catch (e) {
      console.log("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const providerStats = useMemo(() => {
    return Object.entries(AI_PROVIDERS).map(([providerId, providerInfo]) => {
      const connections = providerConnections.filter((conn) => conn.provider === providerId);
      const connected = connections.filter(
        (conn) =>
          conn.isActive !== false &&
          (conn.testStatus === "active" ||
            conn.testStatus === "success" ||
            conn.testStatus === "unknown")
      ).length;
      const errors = connections.filter(
        (conn) =>
          conn.isActive !== false &&
          (conn.testStatus === "error" ||
            conn.testStatus === "expired" ||
            conn.testStatus === "unavailable")
      ).length;

      return {
        id: providerId,
        provider: providerInfo,
        total: connections.length,
        connected,
        errors,
      };
    });
  }, [providerConnections]);

  const quickStartLinks = [
    { label: "Documentation", href: "/docs" },
    { label: "OpenAI API compatibility", href: "/docs#api-reference" },
    { label: "Cherry/Codex compatibility", href: "/docs#client-compatibility" },
    { label: "Report issue", href: "https://github.com/decolua/omniroute/issues", external: true },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const currentEndpoint = baseUrl;

  return (
    <div className="flex flex-col gap-8">
      {/* Quick Start */}
      <Card>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold">Quick Start</h2>
            <p className="text-sm text-text-muted">
              First-time setup checklist for API clients and IDE tools.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="rounded-lg border border-border bg-bg-subtle p-3">
              <span className="font-semibold">1. Create API key</span>
              <p className="text-text-muted mt-1">
                Generate one key per environment to isolate usage and revoke safely.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-3">
              <span className="font-semibold">2. Connect provider account</span>
              <p className="text-text-muted mt-1">
                Configure providers in Dashboard and validate with Test Connection.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-3">
              <span className="font-semibold">3. Use endpoint</span>
              <p className="text-text-muted mt-1">
                Point clients to <code>{currentEndpoint}</code> and send requests to{" "}
                <code>/chat/completions</code>.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-3">
              <span className="font-semibold">4. Monitor usage</span>
              <p className="text-text-muted mt-1">
                Track requests, tokens, errors, and cost in Usage and Request Logger.
              </p>
            </li>
          </ol>

          <div className="flex flex-wrap gap-2">
            {quickStartLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {link.external ? "open_in_new" : "arrow_forward"}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Card>

      {/* Providers Overview */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Providers Overview</h2>
            <p className="text-sm text-text-muted">
              {providerStats.filter((item) => item.total > 0).length} configured of{" "}
              {providerStats.length} available providers
            </p>
          </div>
          <Link
            href="/dashboard/providers"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">settings</span>
            Manage Providers
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {providerStats.map((item) => (
            <ProviderOverviewCard key={item.id} item={item} />
          ))}
        </div>
      </Card>
    </div>
  );
}

HomePageClient.propTypes = {
  machineId: PropTypes.string,
};

function ProviderOverviewCard({ item }) {
  const [imgError, setImgError] = useState(false);

  const statusVariant =
    item.errors > 0 ? "text-red-500" : item.connected > 0 ? "text-green-500" : "text-text-muted";

  return (
    <Link
      href={`/dashboard/providers`}
      className="border border-border rounded-lg p-3 hover:bg-surface/40 transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <div
          className="size-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${item.provider.color || "#888"}15` }}
        >
          {imgError ? (
            <span
              className="text-[10px] font-bold"
              style={{ color: item.provider.color || "#888" }}
            >
              {item.provider.textIcon || item.provider.id.slice(0, 2).toUpperCase()}
            </span>
          ) : (
            <Image
              src={`/providers/${item.provider.id}.png`}
              alt={item.provider.name}
              width={26}
              height={26}
              className="object-contain rounded-lg"
              sizes="26px"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate">{item.provider.name}</p>
          <p className={`text-xs ${statusVariant}`}>
            {item.total === 0
              ? "Not configured"
              : `${item.connected} active · ${item.errors} error`}
          </p>
        </div>

        <span className="text-xs text-text-muted">#{item.total}</span>
      </div>
    </Link>
  );
}

ProviderOverviewCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    provider: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
      textIcon: PropTypes.string,
    }).isRequired,
    total: PropTypes.number.isRequired,
    connected: PropTypes.number.isRequired,
    errors: PropTypes.number.isRequired,
  }).isRequired,
};
