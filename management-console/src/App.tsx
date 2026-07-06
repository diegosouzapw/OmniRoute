import { useEffect, useMemo, useState } from "react";
import { ConsoleEndpoint, fetchManagement, managementBaseUrl, setManagementBaseUrl } from "./api";
import { connectManagementEvents, type ManagementEvent } from "./events";

type Tab = {
  id: ConsoleEndpoint;
  label: string;
  summary: string;
};

const tabs: Tab[] = [
  { id: "health", label: "Health", summary: "Daemon, DB, auth, and route readiness." },
  { id: "providers", label: "Providers", summary: "Provider accounts, enabled state, failover readiness." },
  { id: "models", label: "Models", summary: "Catalog, aliases, excluded models, model availability." },
  { id: "keys", label: "API Keys", summary: "Proxy client keys, limits, reveal/regenerate actions." },
  { id: "virtual-keys", label: "Virtual Keys", summary: "Scoped keys, cost controls, revocation." },
  { id: "routing", label: "Routing", summary: "Auto-combo, cooldown, retry, and policy state." },
  { id: "compression/budget", label: "Compression", summary: "RTK/Caveman budgets, forecasts, pressure." },
  { id: "usage/call-logs", label: "Logs", summary: "Recent calls, provider errors, quota events." },
];

export function App() {
  const [active, setActive] = useState<Tab>(tabs[0]);
  const [baseUrl, setBaseUrl] = useState(managementBaseUrl());
  const [status, setStatus] = useState("idle");
  const [payload, setPayload] = useState<string>("No request made yet.");
  const [events, setEvents] = useState<ManagementEvent[]>([]);

  const routePlan = useMemo(() => tabs.map((tab) => `/api/management/${tab.id}`), []);

  useEffect(() => {
    fetchManagement<Record<string, unknown>>(active.id).then((result) => {
      if (cancelled) return;
      setStatus(result.ok ? "online" : "needs facade");
      setPayload(JSON.stringify(result, null, 2));
    });
    return () => {
      cancelled = true;
    };
  }, [active]);

  useEffect(() => {
    return connectManagementEvents({
      onEvent: (event) => setEvents((current) => [event, ...current].slice(0, 6)),
      onStatus: setStatus,
    });
  }, []);

  function saveBaseUrl() {
    setManagementBaseUrl(baseUrl);
    setStatus("saved");
  }

  return (
    <main className="shell">
      <aside className="rail">
        <p className="eyebrow">OmniRoute</p>
        <h1>Management Console</h1>
        <p className="muted">Next-free cockpit for proxy, model, key, quota, and routing control.</p>
        <label className="field">
          Daemon URL
          <input value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} />
        </label>
        <button className="primary" onClick={saveBaseUrl}>Save endpoint</button>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={tab.id === active.id ? "nav active" : "nav"}
              onClick={() => setActive(tab)}
            >
              <span>{tab.label}</span>
              <small>{tab.id}</small>
            </button>
          ))}
        </nav>
      </aside>
      <section className="content">
        <div className="hero">
          <p className="eyebrow">Status: {status}</p>
          <h2>{active.label}</h2>
          <p>{active.summary}</p>
        </div>
        <section className="grid">
          <article className="card wide">
            <h3>Facade response</h3>
            <pre>{payload}</pre>
          </article>
          <article className="card">
            <h3>Migration rule</h3>
            <p>Build every new client against /api/management/* first, then remove Next dashboard routes from runtime packaging.</p>
          </article>
          <article className="card">
            <h3>Live events</h3>
            <ul>
              {events.length === 0 ? (
                <li>No events connected yet</li>
              ) : (
                events.map((event) => (
                  <li key={`${event.type}-${event.timestamp}`}>{event.timestamp} - {event.type}</li>
                ))
              )}
            </ul>
          </article>
          <article className="card">
            <h3>Route plan</h3>
            <ul>
              {routePlan.map((route) => <li key={route}>{route}</li>)}
            </ul>
          </article>
        </section>
      </section>
    </main>
  );
}
