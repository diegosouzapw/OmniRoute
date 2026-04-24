"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EasyIaStyles from "../EasyIaStyles";

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
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<PortalData | null>(null);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("Me diga se minha API key esta funcionando.");
  const [reply, setReply] = useState(
    "O playground do cliente usa a propria API key vinculada a conta."
  );
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  const loadPortalSession = useCallback(
    async (showQueryMessage = true) => {
      try {
        const response = await fetch("/api/portal/session");
        if (response.ok) {
          const payload = await response.json();
          setData(payload);
          setEmail(payload?.customer?.email || payload?.auth?.email || "");
          if (showQueryMessage) {
            setStatus(
              searchParams.get("checkout") === "success"
                ? "Pagamento confirmado. Sessao carregada."
                : ""
            );
          }
        } else {
          const payload = await response.json().catch(() => ({}));
          if (showQueryMessage && searchParams.get("checkout") === "success") {
            setStatus("Pagamento recebido. Entre com email e senha para carregar sua conta.");
          } else if (showQueryMessage && searchParams.get("checkout") === "pending") {
            setStatus("Pagamento pendente. Assim que aprovar, sua conta sera atualizada.");
          } else if (showQueryMessage && searchParams.get("checkout") === "failure") {
            setStatus("Pagamento nao concluido. Voce pode tentar novamente.");
          } else if (payload?.error) {
            setStatus(payload.error);
          }
        }
      } catch {
        if (showQueryMessage) {
          setStatus("Nao foi possivel carregar sua sessao agora. Tente novamente em instantes.");
        }
      } finally {
        setLoadingSession(false);
      }
    },
    [searchParams]
  );

  useEffect(() => {
    void loadPortalSession();
  }, [loadPortalSession]);

  useEffect(() => {
    async function confirmFromQuery() {
      const paymentId = searchParams.get("payment_id");
      if (!paymentId) return;
      const response = await fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      });
      const payload = await response.json().catch(() => ({}));
      if (payload?.message) {
        setStatus(payload.message);
      } else if (!response.ok && payload?.error) {
        setStatus(payload.error);
      }
    }
    void confirmFromQuery();
  }, [searchParams]);

  const primaryKey = useMemo(() => {
    return data?.customer?.apiKeys?.find((key: any) => key.key) || data?.customer?.apiKeys?.[0];
  }, [data]);

  async function login(event?: React.FormEvent) {
    event?.preventDefault();
    setStatus("Validando acesso...");
    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setStatus(payload.error || "Nao foi possivel entrar.");
        return;
      }
      setData(payload);
      setStatus("Acesso liberado.");
    } catch {
      setStatus("Nao foi possivel entrar no portal agora. Tente novamente em instantes.");
    }
  }

  async function copyKey() {
    await navigator.clipboard.writeText(primaryKey?.key || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function runChat(event: React.FormEvent) {
    event.preventDefault();
    setLoadingChat(true);
    setReply("Chamando sua API key...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: primaryKey?.key, model: "global", message }),
      });
      const payload = await response.json();
      setReply(
        payload.content || payload.error?.message || payload.error || "Nao veio resposta textual."
      );
    } catch {
      setReply("Nao foi possivel chamar sua API key agora. Tente novamente em instantes.");
    } finally {
      setLoadingChat(false);
    }
  }

  async function startCheckout(kind: "plan_renewal" | "credit_purchase") {
    if (!data?.customer?.id) return;
    setStatus(kind === "credit_purchase" ? "Gerando recarga..." : "Gerando renovacao...");
    try {
      const response = await fetch("/api/checkout/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          customerId: data.customer.id,
          tokenCredits: kind === "credit_purchase" ? 1_000_000 : 0,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setStatus(payload.error || "Nao foi possivel gerar o checkout.");
        return;
      }
      if (payload.checkoutUrl) {
        window.location.href = payload.checkoutUrl;
        return;
      }
      setStatus(
        "Checkout criado, mas o link ainda nao foi retornado. Tente novamente em instantes."
      );
    } catch {
      setStatus("Nao foi possivel gerar o checkout agora. Tente novamente em instantes.");
    }
  }

  async function logout() {
    await fetch("/api/portal/logout", { method: "POST" });
    setData(null);
    setPassword("");
    setStatus("Sessao encerrada.");
  }

  return (
    <main className="easyia-root portal-wrap">
      <EasyIaStyles />
      <nav className="shell nav">
        <Link className="logo" href="/">
          <span className="logo-mark" /> Easy IA
        </Link>
        <div className="nav-links">
          <Link href="/">Landing</Link>
          <a href="#playground">Playground</a>
          <a href="#financeiro">Financeiro</a>
        </div>
        {data ? (
          <button className="ghost" onClick={logout}>
            Sair
          </button>
        ) : (
          <Link className="ghost" href="/">
            Voltar
          </Link>
        )}
      </nav>

      <section className="shell portal-grid">
        <aside className="portal-card">
          <span className="badge">Area do cliente</span>
          <h2>Entrar</h2>
          <p className="muted">
            Acesse com email e senha. A API key fica protegida dentro do portal do cliente.
          </p>
          <form className="form" onSubmit={login}>
            <input
              type="email"
              placeholder="email@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="cta">Acessar painel</button>
          </form>
          {status && <p className="notice">{status}</p>}
        </aside>

        <section className="portal-card">
          {loadingSession ? (
            <div>
              <span className="badge">Portal</span>
              <h1 style={{ fontSize: 58 }}>Carregando sua area do cliente...</h1>
            </div>
          ) : !data ? (
            <div>
              <span className="badge">Portal</span>
              <h1 style={{ fontSize: 58 }}>Seu consumo, chave e testes em um lugar so.</h1>
              <p className="lead">
                Ao entrar, o cliente visualiza plano, tokens, API key, financeiro, renovacao e
                recarga sem entrar no painel administrativo.
              </p>
            </div>
          ) : (
            <div>
              <div className="section-title">
                <div>
                  <span className="badge">{data.customer?.status || "ativo"}</span>
                  <h2>{data.customer?.name}</h2>
                  <p className="muted">
                    Plano {data.plan?.name || data.customer?.planName || "sem plano"}
                  </p>
                </div>
                <button className="ghost" onClick={() => void loadPortalSession(false)}>
                  Atualizar
                </button>
              </div>

              <div className="stat-grid">
                <div className="stat">
                  <strong>{fmt(data.usage?.usedTokens)}</strong>
                  <p className="muted">tokens usados</p>
                </div>
                <div className="stat">
                  <strong>{fmt(data.usage?.limitTokens)}</strong>
                  <p className="muted">limite do ciclo</p>
                </div>
                <div className="stat">
                  <strong>{fmt(data.usage?.remainingTokens)}</strong>
                  <p className="muted">tokens restantes</p>
                </div>
              </div>
              <div className="progress">
                <span style={{ width: pct(data.usage?.percentUsed) }} />
              </div>

              <section className="section" style={{ paddingBottom: 20 }}>
                <div className="section-title">
                  <h2>API key</h2>
                  <p>Uso exclusivo do cliente. Nao compartilhe em front-end publico.</p>
                </div>
                <div className="codebox">
                  {primaryKey?.key || "API key sera exibida aqui apos login valido."}
                </div>
                <p className="muted">
                  Chave emitida e vinculada automaticamente ao seu plano ativo.
                </p>
                <div className="hero-actions">
                  <button className="small-btn" onClick={copyKey}>
                    {copied ? "Copiada" : "Copiar API key"}
                  </button>
                </div>
              </section>

              <section id="financeiro" className="section" style={{ paddingBottom: 20 }}>
                <div className="section-title">
                  <h2>Financeiro</h2>
                  <p>Status da mensalidade e creditos adicionais.</p>
                </div>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Status</th>
                      <td>{data.customer?.billingStatus || "active"}</td>
                    </tr>
                    <tr>
                      <th>Pago ate</th>
                      <td>{data.customer?.paidUntil || "sem vencimento configurado"}</td>
                    </tr>
                    <tr>
                      <th>Creditos extras</th>
                      <td>{fmt(data.customer?.extraTokenCredits)} tokens</td>
                    </tr>
                  </tbody>
                </table>
                <div className="hero-actions">
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => startCheckout("plan_renewal")}
                  >
                    Renovar plano
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => startCheckout("credit_purchase")}
                  >
                    Comprar 1M tokens
                  </button>
                </div>
              </section>

              <section id="playground" className="section" style={{ paddingBottom: 0 }}>
                <div className="section-title">
                  <h2>Playground</h2>
                  <p>Teste sua API key chamando o combo global.</p>
                </div>
                <form className="chat-form" onSubmit={runChat}>
                  <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
                  <button className="cta" disabled={loadingChat}>
                    {loadingChat ? "Enviando..." : "Enviar teste"}
                  </button>
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
