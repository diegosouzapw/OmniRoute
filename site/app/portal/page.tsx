"use client";

import { useEffect, useMemo, useState } from "react";

type PortalData = {
  customer?: any;
  plan?: any;
  usage?: any;
  allowedCombos?: string[];
};

function fmt(n: number) {
  return Number(n || 0).toLocaleString("pt-BR");
}

function pct(value: number) {
  return `${Math.round((value || 0) * 100)}%`;
}

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [data, setData] = useState<PortalData | null>(null);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("Me diga se minha API key esta funcionando.");
  const [reply, setReply] = useState("O playground do cliente usa a propria API key vinculada a conta.");
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("easyia.portal");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setEmail(parsed.email || "");
      setApiKey(parsed.apiKey || "");
    } catch {}
  }, []);

  const primaryKey = useMemo(() => {
    return data?.customer?.apiKeys?.find((key: any) => key.key) || data?.customer?.apiKeys?.[0];
  }, [data]);

  async function login(event?: React.FormEvent) {
    event?.preventDefault();
    setStatus("Validando acesso...");
    const response = await fetch("/api/portal/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, apiKey }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setStatus(payload.error || "Nao foi possivel entrar.");
      return;
    }
    localStorage.setItem("easyia.portal", JSON.stringify({ email, apiKey }));
    setData(payload);
    setStatus("Acesso liberado.");
  }

  async function copyKey() {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function runChat(event: React.FormEvent) {
    event.preventDefault();
    setLoadingChat(true);
    setReply("Chamando sua API key...");
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey, model: "global", message }),
    });
    const payload = await response.json();
    setReply(payload.content || payload.error?.message || payload.error || "Nao veio resposta textual.");
    setLoadingChat(false);
  }

  return (
    <main className="portal-wrap">
      <nav className="shell nav">
        <a className="logo" href="/"><span className="logo-mark" /> Easy IA</a>
        <div className="nav-links"><a href="/">Landing</a><a href="#playground">Playground</a><a href="#financeiro">Financeiro</a></div>
        <a className="ghost" href="/">Voltar</a>
      </nav>

      <section className="shell portal-grid">
        <aside className="portal-card">
          <span className="badge">Area do cliente</span>
          <h2>Entrar</h2>
          <p className="muted">Use o email cadastrado e sua API key. Depois colocamos senha, checkout e recuperacao de acesso.</p>
          <form className="form" onSubmit={login}>
            <input type="email" placeholder="email@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input placeholder="sk-..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} required />
            <button className="cta">Acessar painel</button>
          </form>
          {status && <p className="notice">{status}</p>}
        </aside>

        <section className="portal-card">
          {!data ? (
            <div>
              <span className="badge">Portal</span>
              <h1 style={{ fontSize: 58 }}>Seu consumo, chave e testes em um lugar so.</h1>
              <p className="lead">Ao entrar, o cliente visualiza plano, tokens, API key, financeiro e usa o playground sem entrar no dashboard administrativo.</p>
            </div>
          ) : (
            <div>
              <div className="section-title">
                <div>
                  <span className="badge">{data.customer?.status || "ativo"}</span>
                  <h2>{data.customer?.name}</h2>
                  <p className="muted">Plano {data.plan?.name || data.customer?.planName || "sem plano"}</p>
                </div>
                <button className="ghost" onClick={() => login()}>Atualizar</button>
              </div>

              <div className="stat-grid">
                <div className="stat"><strong>{fmt(data.usage?.usedTokens)}</strong><p className="muted">tokens usados</p></div>
                <div className="stat"><strong>{fmt(data.usage?.limitTokens)}</strong><p className="muted">limite do ciclo</p></div>
                <div className="stat"><strong>{fmt(data.usage?.remainingTokens)}</strong><p className="muted">tokens restantes</p></div>
              </div>
              <div className="progress"><span style={{ width: pct(data.usage?.percentUsed) }} /></div>

              <section className="section" style={{ paddingBottom: 20 }}>
                <div className="section-title"><h2>API key</h2><p>Uso exclusivo do cliente. Nao compartilhe em front-end publico.</p></div>
                <div className="codebox">{primaryKey?.key || apiKey}</div>
                <div className="hero-actions"><button className="small-btn" onClick={copyKey}>{copied ? "Copiada" : "Copiar API key"}</button></div>
              </section>

              <section id="financeiro" className="section" style={{ paddingBottom: 20 }}>
                <div className="section-title"><h2>Financeiro</h2><p>Status da mensalidade e creditos adicionais.</p></div>
                <table className="table">
                  <tbody>
                    <tr><th>Status</th><td>{data.customer?.billingStatus || "active"}</td></tr>
                    <tr><th>Pago ate</th><td>{data.customer?.paidUntil || "sem vencimento configurado"}</td></tr>
                    <tr><th>Creditos extras</th><td>{fmt(data.customer?.extraTokenCredits)} tokens</td></tr>
                  </tbody>
                </table>
                <div className="hero-actions"><button className="ghost" type="button">Solicitar recarga</button><button className="ghost" type="button">Falar com financeiro</button></div>
              </section>

              <section id="playground" className="section" style={{ paddingBottom: 0 }}>
                <div className="section-title"><h2>Playground</h2><p>Teste sua API key chamando o combo global.</p></div>
                <form className="chat-form" onSubmit={runChat}>
                  <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
                  <button className="cta" disabled={loadingChat}>{loadingChat ? "Enviando..." : "Enviar teste"}</button>
                </form>
                <div className="bubble ai">{reply}</div>
              </section>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
