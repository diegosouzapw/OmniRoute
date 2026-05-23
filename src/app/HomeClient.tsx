"use client";

import { useEffect, useMemo, useState } from "react";
import EasyIaStyles from "./EasyIaStyles";

type Combo = { id: string; name: string; description?: string; strategy?: string };
type Plan = {
  id: string;
  name: string;
  slug: string;
  monthlyTokenLimit: number;
  priceMonthlyCents: number;
  combos: Combo[];
};

type Lang = "pt" | "en";

type UiText = {
  navPlans: string;
  navCombos: string;
  navTry: string;
  navClient: string;
  startNow: string;
  heroTag: string;
  heroTitle: string;
  heroLead: string;
  viewPlans: string;
  loginClient: string;
  metric1Title: string;
  metric1Desc: string;
  metric2Title: string;
  metric2Desc: string;
  metric3Title: string;
  metric3Desc: string;
  trustTitle: string;
  trustLead: string;
  comboSectionTitle: string;
  comboSectionLead: string;
  plansTitle: string;
  plansLead: string;
  monthlyLabel: string;
  pricedByRequest: string;
  choosePlan: string;
  signupTag: string;
  signupTitle: string;
  signupLead: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderCompany: string;
  placeholderPassword: string;
  subscribeNow: string;
  playgroundTitle: string;
  playgroundIntro: string;
  testChat: string;
  testing: string;
  footer: string;
  demoDefaultMsg: string;
  demoDefaultReply: string;
  statusPreparing: string;
  statusSignupFail: string;
  statusCheckoutRedirect: string;
  statusFreeActivated: string;
  statusCheckoutPending: string;
  statusCheckoutOffline: string;
  statusCalling: string;
  statusNoText: string;
  statusDemoOffline: string;
  strategyFallback: string;
};

const copy: Record<Lang, UiText> = {
  pt: {
    navPlans: "Planos",
    navCombos: "Combos",
    navTry: "Teste",
    navClient: "Area do cliente",
    startNow: "Comecar agora",
    heroTag: "Infraestrutura premium para produtos de IA",
    heroTitle: "Escala, estabilidade e qualidade para vender LLMs com confianca.",
    heroLead:
      "Entregue experiencias de alto nivel com rotas inteligentes, controle de consumo e desempenho consistente para cada cliente.",
    viewPlans: "Ver planos",
    loginClient: "Entrar na area do cliente",
    metric1Title: "99.95%",
    metric1Desc: "SLA de disponibilidade",
    metric2Title: "Multi-LLM",
    metric2Desc: "Qualidade com redundancia",
    metric3Title: "Real-time",
    metric3Desc: "Observabilidade e controle",
    trustTitle: "Um time focado em operacao critica de IA",
    trustLead:
      "Arquitetura preparada para throughput alto, latencia previsivel e resiliencia em cenarios reais de negocio.",
    comboSectionTitle: "Combos orientados a resultado, nao a complexidade.",
    comboSectionLead:
      "Seu cliente compra performance e previsibilidade. Nos bastidores, voce opera com estrategias inteligentes para cada caso de uso.",
    plansTitle: "Planos comerciais prontos para crescimento.",
    plansLead:
      "Distribua produtos por combos e limites de tokens por ciclo. Simples para vender, forte para operar.",
    monthlyLabel: "por mes",
    pricedByRequest: "com consumo e governanca por API key.",
    choosePlan: "Escolher plano",
    signupTag: "Cadastro comercial",
    signupTitle: "Inicie seu ambiente de producao.",
    signupLead:
      "Crie a conta, selecione um plano e siga para o checkout. Sua equipe acessa dashboard, consumo e API key em minutos.",
    placeholderName: "Nome completo",
    placeholderEmail: "Email corporativo",
    placeholderCompany: "Empresa",
    placeholderPassword: "Crie uma senha segura",
    subscribeNow: "Assinar com Mercado Pago",
    playgroundTitle: "Playground publico",
    playgroundIntro: "Teste agora a experiencia de resposta com alta disponibilidade.",
    testChat: "Testar chat",
    testing: "Testando...",
    footer:
      "Easy IA | Plataforma profissional para comercializacao de servicos LLM com confiabilidade empresarial.",
    demoDefaultMsg: "Explique em uma frase como sua plataforma garante estabilidade para clientes.",
    demoDefaultReply:
      "A resposta aparece aqui. O playground usa configuracao de demonstração e pode variar conforme ambiente.",
    statusPreparing: "Preparando seu checkout...",
    statusSignupFail: "Nao foi possivel criar sua assinatura agora.",
    statusCheckoutRedirect: "Checkout criado. Redirecionando para o Mercado Pago...",
    statusFreeActivated: "Conta ativada. Entre na area do cliente com email e senha.",
    statusCheckoutPending:
      "Checkout criado. Se o redirecionamento nao abrir, tente novamente em instantes.",
    statusCheckoutOffline: "Nao foi possivel falar com o checkout agora. Tente novamente em instantes.",
    statusCalling: "Consultando o playground...",
    statusNoText: "Nao veio texto de resposta.",
    statusDemoOffline:
      "Nao foi possivel falar com o playground publico agora. Tente novamente em instantes.",
    strategyFallback: "Roteamento inteligente com fallback e distribuicao de carga.",
  },
  en: {
    navPlans: "Plans",
    navCombos: "Combos",
    navTry: "Try",
    navClient: "Client portal",
    startNow: "Get started",
    heroTag: "Premium infrastructure for AI products",
    heroTitle: "Scale, stability, and quality to sell LLM services with confidence.",
    heroLead:
      "Deliver high-end AI experiences with smart routing, usage governance, and consistent performance for every customer.",
    viewPlans: "View plans",
    loginClient: "Access client portal",
    metric1Title: "99.95%",
    metric1Desc: "Availability SLA",
    metric2Title: "Multi-LLM",
    metric2Desc: "Quality with redundancy",
    metric3Title: "Real-time",
    metric3Desc: "Observability and control",
    trustTitle: "An operations-first team for mission-critical AI",
    trustLead:
      "Built for high throughput, predictable latency, and resilience in real business workloads.",
    comboSectionTitle: "Outcome-driven combos, without operational complexity.",
    comboSectionLead:
      "Your customers buy performance and reliability, while your team runs intelligent strategies behind the scenes.",
    plansTitle: "Commercial plans built for growth.",
    plansLead:
      "Package products by combo and token budget. Easy to sell, strong in production.",
    monthlyLabel: "per month",
    pricedByRequest: "with API key governance and usage control.",
    choosePlan: "Choose plan",
    signupTag: "Commercial onboarding",
    signupTitle: "Launch your production environment.",
    signupLead:
      "Create your account, choose a plan, and continue to checkout. Your team gets dashboard, API key, and usage visibility in minutes.",
    placeholderName: "Full name",
    placeholderEmail: "Business email",
    placeholderCompany: "Company",
    placeholderPassword: "Create a secure password",
    subscribeNow: "Subscribe with Mercado Pago",
    playgroundTitle: "Public playground",
    playgroundIntro: "Test response quality now with high availability.",
    testChat: "Run chat test",
    testing: "Testing...",
    footer:
      "Easy IA | Professional platform for commercial LLM services with enterprise-grade reliability.",
    demoDefaultMsg: "Explain in one sentence how your platform keeps customer AI stable.",
    demoDefaultReply:
      "The response appears here. The playground uses a demo configuration and may vary by environment.",
    statusPreparing: "Preparing your checkout...",
    statusSignupFail: "We could not create your subscription right now.",
    statusCheckoutRedirect: "Checkout created. Redirecting to Mercado Pago...",
    statusFreeActivated: "Account activated. Sign in to the client portal with email and password.",
    statusCheckoutPending:
      "Checkout created. If redirect does not open, please try again shortly.",
    statusCheckoutOffline: "Checkout is temporarily unavailable. Please try again shortly.",
    statusCalling: "Calling the playground...",
    statusNoText: "No text content was returned.",
    statusDemoOffline: "Public playground is temporarily unavailable. Please try again shortly.",
    strategyFallback: "Intelligent routing with failover and load distribution.",
  },
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
      { id: "cost", name: "Cost Optimized" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    slug: "enterprise",
    monthlyTokenLimit: 100_000_000,
    priceMonthlyCents: 89900,
    combos: [
      { id: "dedicated", name: "Dedicated Routes" },
      { id: "sla", name: "High Availability" },
    ],
  },
];

function money(cents: number) {
  if (!cents) return "Custom";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

function tokens(value: number) {
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M tokens`;
  return `${value.toLocaleString("pt-BR")} tokens`;
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("pt");
  const text = copy[lang];
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [signup, setSignup] = useState({ name: "", email: "", company: "", password: "" });
  const [signupStatus, setSignupStatus] = useState("");
  const [demoMessage, setDemoMessage] = useState(text.demoDefaultMsg);
  const [demoReply, setDemoReply] = useState(text.demoDefaultReply);
  const [demoLoading, setDemoLoading] = useState(false);

  useEffect(() => {
    setDemoMessage(text.demoDefaultMsg);
    setDemoReply(text.demoDefaultReply);
  }, [text.demoDefaultMsg, text.demoDefaultReply]);

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
    setSignupStatus(text.statusPreparing);

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
        setSignupStatus(data.error || text.statusSignupFail);
        return;
      }
      if (data.checkoutUrl) {
        setSignupStatus(text.statusCheckoutRedirect);
        window.location.href = data.checkoutUrl;
        return;
      }
      if (data.freeActivation) {
        setSignupStatus(text.statusFreeActivated);
        return;
      }
      setSignupStatus(text.statusCheckoutPending);
    } catch {
      setSignupStatus(text.statusCheckoutOffline);
    }
  }

  async function runDemo(event: React.FormEvent) {
    event.preventDefault();
    setDemoLoading(true);
    setDemoReply(text.statusCalling);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: demoMessage, model: "global" }),
      });
      const data = await response.json();
      setDemoReply(
        data.content || data.error?.message || data.error || text.statusNoText
      );
    } catch {
      setDemoReply(text.statusDemoOffline);
    } finally {
      setDemoLoading(false);
    }
  }

  return (
    <main className="easyia-root">
      <EasyIaStyles />

      <nav className="shell nav">
        <a className="logo" href="#top">
          <span className="logo-mark" /> Easy IA
        </a>
        <div className="nav-links">
          <a href="#planos">{text.navPlans}</a>
          <a href="#combos">{text.navCombos}</a>
          <a href="#teste">{text.navTry}</a>
          <a href="/portal">{text.navClient}</a>
        </div>
        <div className="lang-switch">
          <button type="button" className={lang === "pt" ? "active" : ""} onClick={() => setLang("pt")}>
            PT
          </button>
          <button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
        <a className="cta" href="#cadastro">
          {text.startNow}
        </a>
      </nav>

      <section id="top" className="shell hero">
        <div>
          <span className="badge">{text.heroTag}</span>
          <h1>{text.heroTitle}</h1>
          <p className="lead">{text.heroLead}</p>
          <div className="hero-actions">
            <a className="cta" href="#planos">{text.viewPlans}</a>
            <a className="ghost" href="/portal">{text.loginClient}</a>
          </div>
          <div className="metric-row">
            <div className="metric">
              <strong>{text.metric1Title}</strong>
              <span>{text.metric1Desc}</span>
            </div>
            <div className="metric">
              <strong>{text.metric2Title}</strong>
              <span>{text.metric2Desc}</span>
            </div>
            <div className="metric">
              <strong>{text.metric3Title}</strong>
              <span>{text.metric3Desc}</span>
            </div>
          </div>
        </div>

        <div id="teste" className="chat-card">
          <div className="chat-top">
            <div className="dots"><i /><i /><i /></div>
            <span>{text.playgroundTitle}</span>
          </div>
          <div className="bubble ai">{text.playgroundIntro}</div>
          <form className="chat-form" onSubmit={runDemo}>
            <textarea value={demoMessage} onChange={(e) => setDemoMessage(e.target.value)} rows={4} />
            <button className="small-btn" disabled={demoLoading}>{demoLoading ? text.testing : text.testChat}</button>
          </form>
          <div className="bubble user">{demoMessage}</div>
          <div className="bubble ai">{demoReply}</div>
        </div>
      </section>

      <section className="shell team-strip" aria-label="team-datacenter">
        <article className="team-card">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
            alt="Team discussing AI operations in datacenter"
          />
          <div>
            <h3>{text.trustTitle}</h3>
            <p>{text.trustLead}</p>
          </div>
        </article>
        <article className="team-card">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
            alt="Engineers planning enterprise AI reliability"
          />
          <div>
            <h3>Enterprise AI Operations</h3>
            <p>Production mindset, measured performance, and customer trust in every deployment.</p>
          </div>
        </article>
      </section>

      <section id="combos" className="shell section">
        <div className="section-title">
          <h2>{text.comboSectionTitle}</h2>
          <p>{text.comboSectionLead}</p>
        </div>
        <div className="grid">
          {allCombos.slice(0, 6).map((combo) => (
            <article className="card feature" key={combo.id}>
              <span className="badge">{combo.strategy || "smart"}</span>
              <h3>{combo.name}</h3>
              <p className="muted">{combo.description || text.strategyFallback}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="planos" className="shell section">
        <div className="section-title">
          <h2>{text.plansTitle}</h2>
          <p>{text.plansLead}</p>
        </div>
        <div className="grid">
          {plans.map((plan) => (
            <article className="card" key={plan.id}>
              <span className="badge">{tokens(plan.monthlyTokenLimit)}</span>
              <h3>{plan.name}</h3>
              <div className="price">{money(plan.priceMonthlyCents)}</div>
              <p className="muted">{text.monthlyLabel}, {text.pricedByRequest}</p>
              <div className="combo-list">
                {(plan.combos || []).slice(0, 5).map((combo) => (
                  <span className="combo-pill" key={combo.id}>{combo.name}</span>
                ))}
              </div>
              <a className="cta" style={{ display: "inline-flex", marginTop: 22 }} href="#cadastro" onClick={() => setSelectedPlan(plan.id)}>
                {text.choosePlan}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="cadastro" className="shell section signup-panel">
        <div className="card">
          <span className="badge">{text.signupTag}</span>
          <h2>{text.signupTitle}</h2>
          <p className="muted">{text.signupLead}</p>
        </div>
        <form className="card form" onSubmit={submitSignup}>
          <input placeholder={text.placeholderName} value={signup.name} onChange={(e) => setSignup({ ...signup, name: e.target.value })} required />
          <input placeholder={text.placeholderEmail} type="email" value={signup.email} onChange={(e) => setSignup({ ...signup, email: e.target.value })} required />
          <input placeholder={text.placeholderCompany} value={signup.company} onChange={(e) => setSignup({ ...signup, company: e.target.value })} />
          <input placeholder={text.placeholderPassword} type="password" value={signup.password} onChange={(e) => setSignup({ ...signup, password: e.target.value })} required />
          <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} required>
            {plans.map((plan) => (
              <option value={plan.id} key={plan.id}>{plan.name} - {tokens(plan.monthlyTokenLimit)}</option>
            ))}
          </select>
          <button className="cta">{text.subscribeNow}</button>
          {signupStatus && <div className="notice">{signupStatus}</div>}
        </form>
      </section>

      <footer className="shell footer">{text.footer}</footer>
    </main>
  );
}
