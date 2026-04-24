"use client";

import { useEffect, useMemo, useState } from "react";

type Combo = { id: string; name: string; description?: string; strategy?: string };
type Plan = {
  id: string;
  name: string;
  slug: string;
  monthlyTokenLimit: number;
  priceMonthlyCents: number;
  combos: Combo[];
};

const fallbackPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    slug: "starter",
    monthlyTokenLimit: 1_000_000,
    priceMonthlyCents: 9900,
    combos: [{ id: "global", name: "Global Smart Route" }],
  },
  {
    id: "pro",
    name: "Pro",
    slug: "pro",
    monthlyTokenLimit: 10_000_000,
    priceMonthlyCents: 29900,
    combos: [
      { id: "premium", name: "Premium Mix" },
      { id: "cost", name: "Custo inteligente" },
    ],
  },
  {
    id: "enterprise",
    name: "Empresarial",
    slug: "enterprise",
    monthlyTokenLimit: 100_000_000,
    priceMonthlyCents: 89900,
    combos: [
      { id: "dedicated", name: "Rotas dedicadas" },
      { id: "sla", name: "Alta disponibilidade" },
    ],
  },
];

function money(cents: number) {
  if (!cents) return "Sob consulta";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

function tokens(value: number) {
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M tokens`;
  return `${value.toLocaleString("pt-BR")} tokens`;
}

export default function LandingPage() {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [signup, setSignup] = useState({ name: "", email: "", company: "", password: "" });
  const [signupStatus, setSignupStatus] = useState("");
  const [demoMessage, setDemoMessage] = useState(
    "Explique em uma frase como sua API escolhe o melhor combo."
  );
  const [demoReply, setDemoReply] = useState(
    "A resposta aparece aqui. Se uma API key demo estiver configurada, o teste fala com o OmniRoute real."
  );
  const [demoLoading, setDemoLoading] = useState(false);

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.plans) && data.plans.length > 0) {
          setPlans(data.plans);
          setSelectedPlan(data.plans[0].id);
        }
      })
      .catch(() => setSelectedPlan(fallbackPlans[0].id));
  }, []);

  const allCombos = useMemo(() => {
    const map = new Map<string, Combo>();
    plans.forEach((plan) => plan.combos?.forEach((combo) => map.set(combo.name, combo)));
    return [...map.values()].slice(0, 8);
  }, [plans]);

  async function submitSignup(event: React.FormEvent) {
    event.preventDefault();
    setSignupStatus("Preparando seu checkout...");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "plan_purchase",
          ...signup,
          planId: selectedPlan || plans[0]?.id,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setSignupStatus(data.error || "Nao foi possivel criar sua assinatura agora.");
        return;
      }
      if (data.checkoutUrl) {
        setSignupStatus("Checkout criado. Redirecionando para o Mercado Pago...");
        window.location.href = data.checkoutUrl;
        return;
      }
      if (data.freeActivation) {
        setSignupStatus("Conta ativada. Entre na area do cliente com email e senha.");
        return;
      }
      setSignupStatus(
        "Checkout criado. Se o redirecionamento nao abrir, tente novamente em instantes."
      );
    } catch {
      setSignupStatus("Nao foi possivel falar com o checkout agora. Tente novamente em instantes.");
    }
  }

  async function runDemo(event: React.FormEvent) {
    event.preventDefault();
    setDemoLoading(true);
    setDemoReply("Chamando o gateway...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: demoMessage, model: "global" }),
      });
      const data = await response.json();
      setDemoReply(
        data.content || data.error?.message || data.error || "Nao veio texto de resposta."
      );
    } catch {
      setDemoReply(
        "Nao foi possivel falar com o playground publico agora. Tente novamente em instantes."
      );
    } finally {
      setDemoLoading(false);
    }
  }

  return (
    <main>
      <nav className="shell nav">
        <a className="logo" href="#top">
          <span className="logo-mark" /> Easy IA
        </a>
        <div className="nav-links">
          <a href="#planos">Planos</a>
          <a href="#combos">Combos</a>
          <a href="#teste">Teste</a>
          <a href="/portal">Area do cliente</a>
        </div>
        <a className="cta" href="#cadastro">
          Comecar agora
        </a>
      </nav>

      <section id="top" className="shell hero">
        <div>
          <span className="badge">Gateway brasileiro de IA por combos</span>
          <h1>Venda IA como produto, nao como gambiarra.</h1>
          <p className="lead">
            Uma API unica para clientes usarem combos inteligentes, limites de tokens, consumo por
            chave e fallback entre provedores. A marca final voce edita depois.
          </p>
          <div className="hero-actions">
            <a className="cta" href="#planos">
              Ver planos
            </a>
            <a className="ghost" href="/portal">
              Entrar na area do cliente
            </a>
          </div>
          <div className="metric-row">
            <div className="metric">
              <strong>/v1</strong>
              <span>Endpoint compativel</span>
            </div>
            <div className="metric">
              <strong>Combos</strong>
              <span>Produto vendido ao cliente</span>
            </div>
            <div className="metric">
              <strong>Tokens</strong>
              <span>Limite por ciclo</span>
            </div>
          </div>
        </div>

        <div id="teste" className="chat-card">
          <div className="chat-top">
            <div className="dots">
              <i />
              <i />
              <i />
            </div>
            <span>Playground publico</span>
          </div>
          <div className="bubble ai">
            Oi! Sou o teste da Easy IA. Posso responder usando um combo do seu OmniRoute.
          </div>
          <form className="chat-form" onSubmit={runDemo}>
            <textarea
              value={demoMessage}
              onChange={(e) => setDemoMessage(e.target.value)}
              rows={4}
            />
            <button className="small-btn" disabled={demoLoading}>
              {demoLoading ? "Testando..." : "Testar chat"}
            </button>
          </form>
          <div className="bubble user">{demoMessage}</div>
          <div className="bubble ai">{demoReply}</div>
        </div>
      </section>

      <section id="combos" className="shell section">
        <div className="section-title">
          <h2>Combos viram os seus produtos.</h2>
          <p>
            O cliente nao precisa saber quais modelos existem por tras. Ele escolhe um plano e usa
            os combos liberados.
          </p>
        </div>
        <div className="grid">
          {allCombos.slice(0, 6).map((combo) => (
            <article className="card feature" key={combo.id}>
              <span className="badge">{combo.strategy || "smart"}</span>
              <h3>{combo.name}</h3>
              <p className="muted">
                {combo.description || "Rota com fallback, distribuicao e controle operacional."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="planos" className="shell section">
        <div className="section-title">
          <h2>Planos simples de entender.</h2>
          <p>
            Mostramos combos e limites, sem expor modelos internos. A engenharia fica escondida, o
            valor fica claro.
          </p>
        </div>
        <div className="grid">
          {plans.map((plan) => (
            <article className="card" key={plan.id}>
              <span className="badge">{tokens(plan.monthlyTokenLimit)}</span>
              <h3>{plan.name}</h3>
              <div className="price">{money(plan.priceMonthlyCents)}</div>
              <p className="muted">por mes, com consumo controlado por API key.</p>
              <div className="combo-list">
                {(plan.combos || []).slice(0, 5).map((combo) => (
                  <span className="combo-pill" key={combo.id}>
                    {combo.name}
                  </span>
                ))}
              </div>
              <a
                className="cta"
                style={{ display: "inline-flex", marginTop: 22 }}
                href="#cadastro"
                onClick={() => setSelectedPlan(plan.id)}
              >
                Escolher plano
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="cadastro" className="shell section signup-panel">
        <div className="card">
          <span className="badge">Cadastro</span>
          <h2>Crie uma conta de cliente.</h2>
          <p className="muted">
            O cadastro prepara sua conta com senha e abre o checkout do Mercado Pago. A API key
            aparece depois na area do cliente, ja vinculada ao plano.
          </p>
        </div>
        <form className="card form" onSubmit={submitSignup}>
          <input
            placeholder="Nome"
            value={signup.name}
            onChange={(e) => setSignup({ ...signup, name: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            type="email"
            value={signup.email}
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
            required
          />
          <input
            placeholder="Empresa"
            value={signup.company}
            onChange={(e) => setSignup({ ...signup, company: e.target.value })}
          />
          <input
            placeholder="Crie uma senha"
            type="password"
            value={signup.password}
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
            required
          />
          <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} required>
            {plans.map((plan) => (
              <option value={plan.id} key={plan.id}>
                {plan.name} - {tokens(plan.monthlyTokenLimit)}
              </option>
            ))}
          </select>
          <button className="cta">Assinar com Mercado Pago</button>
          {signupStatus && <div className="notice">{signupStatus}</div>}
        </form>
      </section>

      <footer className="shell footer">
        Easy IA com planos do sistema, portal por email e senha e checkout Mercado Pago. Logo e
        textos finais podem ser editados depois.
      </footer>
    </main>
  );
}
