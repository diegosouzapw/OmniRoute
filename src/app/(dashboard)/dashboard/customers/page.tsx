"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge, Button, Card, Input, Modal, Select } from "@/shared/components";
import { cn } from "@/shared/utils/cn";

type Plan = {
  id: string;
  name: string;
  slug: string;
  monthlyTokenLimit: number;
  priceMonthlyCents: number;
  isActive: boolean;
  allowAllModels: boolean;
  allowAllCombos: boolean;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "active" | "inactive" | "blocked";
  planId: string | null;
  planName?: string | null;
  priceMonthlyCents?: number | null;
  extraTokenCredits: number;
  billingStatus: "active" | "past_due" | "canceled";
  paidUntil: string | null;
  allowedModels?: string[];
  allowedCombos?: string[];
  apiKeys?: Array<{
    id: string;
    apiKeyId: string;
    label: string;
    key?: string | null;
    keyName?: string | null;
    keyPreview?: string | null;
    isActive: boolean;
    usedTokens?: number;
    requestCount?: number;
  }>;
  usage?: {
    usedTokens: number;
    limitTokens: number;
    remainingTokens: number;
    percentUsed: number;
    requestCount: number;
    cycleStart: string;
    cycleEnd: string;
    blocked: boolean;
    blockReason: string | null;
  };
};

type Model = { id: string };
type Combo = { id: string; name: string };
type ActiveTab = "users" | "plans" | "finance";
type CustomerApiKey = NonNullable<Customer["apiKeys"]>[number];
type ApiKeyViewTarget = {
  customer: Customer;
  apiKey: CustomerApiKey;
};

const emptyCustomerForm = {
  name: "",
  email: "",
  company: "",
  planId: "",
  allowedModelsText: "",
  allowedCombosText: "",
};

const tabs: Array<{ id: ActiveTab; label: string; icon: string; hint: string }> = [
  { id: "users", label: "Usuarios", icon: "person", hint: "Clientes, API keys e permissoes" },
  { id: "plans", label: "Planos", icon: "sell", hint: "Pacotes e limites de tokens" },
  { id: "finance", label: "Financeiro", icon: "payments", hint: "Consumo, bloqueios e cobranca" },
];

function listFromText(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatTokens(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(Math.max(0, Math.round(value || 0)));
}

function formatMoneyFromCents(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Math.max(0, Math.round(value || 0)) / 100
  );
}

function centsFromMoneyText(value: string): number {
  const normalized = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed * 100)) : 0;
}

function moneyTextFromCents(value: number): string {
  return String((Math.max(0, Math.round(value || 0)) / 100).toFixed(2)).replace(".", ",");
}

function formatPercent(value: number): string {
  return `${Math.round(Math.min(1, Math.max(0, value || 0)) * 100)}%`;
}

function statusLabel(status: Customer["status"]): string {
  if (status === "active") return "Ativo";
  if (status === "blocked") return "Bloqueado";
  return "Inativo";
}

export default function CustomersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") || "users") as ActiveTab;
  const activeTab: ActiveTab = tabs.some((tab) => tab.id === currentTab) ? currentTab : "users";

  const [plans, setPlans] = useState<Plan[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [apiKeyViewTarget, setApiKeyViewTarget] = useState<ApiKeyViewTarget | null>(null);
  const [customerForm, setCustomerForm] = useState(emptyCustomerForm);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [customerPendingDelete, setCustomerPendingDelete] = useState<Customer | null>(null);
  const [planForm, setPlanForm] = useState({
    name: "Plano Personalizado",
    monthlyTokenLimit: 1_000_000,
    priceMonthlyText: "99,00",
    allowAllModels: true,
    allowAllCombos: true,
  });
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [planPendingDelete, setPlanPendingDelete] = useState<Plan | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [plansRes, customersRes, modelsRes, combosRes] = await Promise.all([
        fetch("/api/saas/plans"),
        fetch("/api/saas/customers"),
        fetch("/v1/models"),
        fetch("/api/combos"),
      ]);
      if (plansRes.ok) setPlans((await plansRes.json()).plans || []);
      if (customersRes.ok) setCustomers((await customersRes.json()).customers || []);
      if (modelsRes.ok) setModels((await modelsRes.json()).data || []);
      if (combosRes.ok) setCombos((await combosRes.json()).combos || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const totalTokensUsed = useMemo(
    () => customers.reduce((total, customer) => total + (customer.usage?.usedTokens || 0), 0),
    [customers]
  );
  const blockedCustomers = customers.filter(
    (customer) => customer.status === "blocked" || customer.usage?.blocked
  ).length;
  const totalApiKeys = customers.reduce(
    (total, customer) => total + (customer.apiKeys?.length || 0),
    0
  );

  const planOptions = useMemo(
    () =>
      plans.map((plan) => ({
        value: plan.id,
        label: `${plan.name} (${formatTokens(plan.monthlyTokenLimit)} tokens)`,
      })),
    [plans]
  );

  const switchTab = (tab: ActiveTab) => {
    router.push(`/dashboard/customers?tab=${tab}`);
  };

  const createPlan = async () => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch("/api/saas/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: planForm.name,
          monthlyTokenLimit: Number(planForm.monthlyTokenLimit) || 0,
          priceMonthlyCents: centsFromMoneyText(planForm.priceMonthlyText),
          allowAllModels: planForm.allowAllModels,
          allowAllCombos: planForm.allowAllCombos,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Nao foi possivel salvar o plano.");
      setNotice({ type: "success", text: `Plano "${data?.plan?.name || planForm.name}" salvo.` });
      setPlanForm((current) => ({ ...current, name: `Plano Personalizado ${plans.length + 2}` }));
      await load();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Nao foi possivel salvar o plano.",
      });
    } finally {
      setSaving(false);
    }
  };

  const updatePlan = async (plan: Plan, patch: Partial<Plan>) => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch("/api/saas/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: plan.id,
          name: patch.name ?? plan.name,
          slug: plan.slug,
          monthlyTokenLimit: patch.monthlyTokenLimit ?? plan.monthlyTokenLimit,
          priceMonthlyCents: patch.priceMonthlyCents ?? plan.priceMonthlyCents,
          isActive: patch.isActive ?? plan.isActive,
          allowAllModels: patch.allowAllModels ?? plan.allowAllModels,
          allowAllCombos: patch.allowAllCombos ?? plan.allowAllCombos,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Nao foi possivel atualizar o plano.");
      await load();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Nao foi possivel atualizar o plano.",
      });
    } finally {
      setSaving(false);
    }
  };

  const startEditPlan = (plan: Plan) => {
    setEditingPlanId(plan.id);
    setPlanForm({
      name: plan.name,
      monthlyTokenLimit: plan.monthlyTokenLimit,
      priceMonthlyText: moneyTextFromCents(plan.priceMonthlyCents),
      allowAllModels: plan.allowAllModels,
      allowAllCombos: plan.allowAllCombos,
    });
  };

  const saveEditedPlan = async () => {
    const plan = plans.find((item) => item.id === editingPlanId);
    if (!plan) return;
    await updatePlan(plan, {
      name: planForm.name,
      monthlyTokenLimit: Number(planForm.monthlyTokenLimit) || 0,
      priceMonthlyCents: centsFromMoneyText(planForm.priceMonthlyText),
      allowAllModels: planForm.allowAllModels,
      allowAllCombos: planForm.allowAllCombos,
    });
    setEditingPlanId(null);
    setPlanForm({
      name: "Plano Personalizado",
      monthlyTokenLimit: 1_000_000,
      priceMonthlyText: "99,00",
      allowAllModels: true,
      allowAllCombos: true,
    });
  };

  const deletePlan = async (plan: Plan) => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/saas/plans?id=${encodeURIComponent(plan.id)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Nao foi possivel excluir o plano.");
      setNotice({ type: "success", text: `Plano "${plan.name}" excluido.` });
      setPlanPendingDelete(null);
      await load();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Nao foi possivel excluir o plano.",
      });
    } finally {
      setSaving(false);
    }
  };

  const createCustomer = async () => {
    setSaving(true);
    setCreatedKey(null);
    setNotice(null);
    try {
      const res = await fetch("/api/saas/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerForm.name,
          email: customerForm.email,
          company: customerForm.company,
          planId: customerForm.planId || null,
          allowedModels: listFromText(customerForm.allowedModelsText),
          allowedCombos: listFromText(customerForm.allowedCombosText),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Nao foi possivel criar o cliente.");
      setCreatedKey(data?.apiKey || null);
      setNotice({ type: "success", text: "Cliente criado com API key inicial." });
      setCustomerForm(emptyCustomerForm);
      await load();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Nao foi possivel criar o cliente.",
      });
    } finally {
      setSaving(false);
    }
  };

  const startEditCustomer = (customer: Customer) => {
    setEditingCustomerId(customer.id);
    setCreatedKey(null);
    setNotice(null);
    setCustomerForm({
      name: customer.name || "",
      email: customer.email || "",
      company: customer.company || "",
      planId: customer.planId || "",
      allowedModelsText: (customer.allowedModels || []).join("\n"),
      allowedCombosText: (customer.allowedCombos || []).join("\n"),
    });
    switchTab("users");
  };

  const cancelEditCustomer = () => {
    setEditingCustomerId(null);
    setCustomerForm(emptyCustomerForm);
  };

  const saveCustomerEdit = async () => {
    if (!editingCustomerId) return;
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/saas/customers/${editingCustomerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerForm.name,
          email: customerForm.email,
          company: customerForm.company,
          planId: customerForm.planId || null,
          allowedModels: listFromText(customerForm.allowedModelsText),
          allowedCombos: listFromText(customerForm.allowedCombosText),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Nao foi possivel editar o cliente.");
      setNotice({ type: "success", text: `Cliente "${customerForm.name}" atualizado.` });
      cancelEditCustomer();
      await load();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Nao foi possivel editar o cliente.",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteCustomer = async (customer: Customer) => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/saas/customers/${customer.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Nao foi possivel excluir o cliente.");
      setNotice({
        type: "success",
        text: `Cliente "${customer.name}" excluido com suas API keys.`,
      });
      setCustomerPendingDelete(null);
      if (editingCustomerId === customer.id) cancelEditCustomer();
      await load();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Nao foi possivel excluir o cliente.",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateCustomerStatus = async (customer: Customer, status: Customer["status"]) => {
    await updateCustomer(customer, { status });
  };

  const updateCustomer = async (customer: Customer, patch: Partial<Customer>) => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/saas/customers/${customer.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Nao foi possivel atualizar o cliente.");
      await load();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Nao foi possivel atualizar o cliente.",
      });
    } finally {
      setSaving(false);
    }
  };

  const addCustomerCredits = async (customer: Customer) => {
    const raw = prompt("Quantos tokens adicionais deseja adicionar?", "1000000");
    if (!raw) return;
    const credits = Math.max(0, Math.round(Number(raw.replace(/\D/g, "")) || Number(raw) || 0));
    if (!credits) return;
    await updateCustomer(customer, {
      extraTokenCredits: (customer.extraTokenCredits || 0) + credits,
      status: "active",
    });
  };

  const markCustomerPaid = async (customer: Customer) => {
    const paidUntil = new Date();
    paidUntil.setMonth(paidUntil.getMonth() + 1);
    await updateCustomer(customer, {
      billingStatus: "active",
      paidUntil: paidUntil.toISOString(),
      status: "active",
    });
  };

  const copyText = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKeyId(keyId);
      setNotice({ type: "success", text: "API key copiada para a area de transferencia." });
    } catch {
      setNotice({
        type: "error",
        text: "Nao foi possivel copiar automaticamente. Selecione a chave e copie manualmente.",
      });
    }
  };

  const customersUsingPendingPlan = planPendingDelete
    ? customers.filter((customer) => customer.planId === planPendingDelete.id).length
    : 0;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Easy IA SaaS
          </p>
          <h1 className="mt-2 text-3xl font-bold text-text-main">Clientes</h1>
          <p className="mt-1 text-sm text-text-muted">
            Administre usuarios, planos, API keys e consumo sem acessar o banco direto.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={load} variant="outline" loading={loading} icon="refresh">
            Atualizar
          </Button>
          <Button onClick={() => switchTab("users")} icon="person_add">
            Novo usuario
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Clientes" value={customers.length} icon="groups" />
        <MetricCard
          label="Ativos"
          value={customers.filter((customer) => customer.status === "active").length}
          icon="verified"
        />
        <MetricCard label="Planos" value={plans.length} icon="sell" />
        <MetricCard label="API keys" value={totalApiKeys} icon="vpn_key" />
        <MetricCard label="Tokens usados" value={formatTokens(totalTokensUsed)} icon="monitoring" />
      </div>

      {(createdKey || notice) && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {createdKey && (
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <p className="text-sm font-semibold text-emerald-400">API key criada</p>
              <code className="mt-2 block break-all rounded-md bg-black/20 p-3 text-sm">
                {createdKey}
              </code>
              <p className="mt-2 text-xs text-text-muted">
                Essa chave aparece inteira somente agora.
              </p>
            </Card>
          )}
          {notice && (
            <Card
              className={
                notice.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-red-500/30 bg-red-500/5"
              }
            >
              <p
                className={
                  notice.type === "success"
                    ? "text-sm font-semibold text-emerald-400"
                    : "text-sm font-semibold text-red-400"
                }
              >
                {notice.text}
              </p>
            </Card>
          )}
        </div>
      )}

      <Card padding="sm" className="border-primary/15">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => switchTab(tab.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
                activeTab === tab.id
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-transparent bg-black/[0.02] text-text-muted hover:border-primary/20 hover:text-text-main dark:bg-white/[0.03]"
              )}
            >
              <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
              <span>
                <span className="block text-sm font-semibold">{tab.label}</span>
                <span className="block text-xs opacity-75">{tab.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </Card>

      {activeTab === "users" && (
        <div className="space-y-6">
          <Card
            title={editingCustomerId ? "Editar usuario" : "Novo usuario"}
            subtitle={
              editingCustomerId
                ? "Atualiza cadastro, plano e permissoes sem trocar a API key"
                : "Cria o cliente e emite a primeira API key exclusiva"
            }
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <Input
                label="Nome"
                value={customerForm.name}
                onChange={(e) => setCustomerForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="Empresa ou responsavel"
              />
              <Input
                label="Email"
                value={customerForm.email}
                onChange={(e) => setCustomerForm((s) => ({ ...s, email: e.target.value }))}
                placeholder="cliente@empresa.com"
              />
              <Input
                label="Empresa"
                value={customerForm.company}
                onChange={(e) => setCustomerForm((s) => ({ ...s, company: e.target.value }))}
                placeholder="Opcional"
              />
              <Select
                label="Plano"
                value={customerForm.planId}
                onChange={(e) => setCustomerForm((s) => ({ ...s, planId: e.target.value }))}
                options={planOptions}
                placeholder="Selecione um plano"
              />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FieldTextarea
                label="Modelos liberados"
                value={customerForm.allowedModelsText}
                onChange={(value) => setCustomerForm((s) => ({ ...s, allowedModelsText: value }))}
                placeholder={"openai/gpt-4o\nanthropic/claude-*"}
                hint="Um por linha. Wildcards como openai/* sao permitidos."
              />
              <FieldTextarea
                label="Combos liberados"
                value={customerForm.allowedCombosText}
                onChange={(value) => setCustomerForm((s) => ({ ...s, allowedCombosText: value }))}
                placeholder={"cost-saver\nglobal-premium"}
                hint="Se o plano liberar todos os combos, esta lista pode ficar vazia."
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={editingCustomerId ? saveCustomerEdit : createCustomer}
                loading={saving}
                disabled={!customerForm.name || !customerForm.email || !customerForm.planId}
                icon={editingCustomerId ? "save" : "key"}
              >
                {editingCustomerId ? "Salvar usuario" : "Criar usuario e API key"}
              </Button>
              {editingCustomerId && (
                <Button onClick={cancelEditCustomer} variant="ghost">
                  Cancelar
                </Button>
              )}
            </div>
          </Card>

          <Card
            title="Usuarios cadastrados"
            subtitle="Consumo calculado pelo uso real das API keys"
          >
            <CustomerTable
              customers={customers}
              onEditCustomer={startEditCustomer}
              onDeleteCustomer={setCustomerPendingDelete}
              onViewApiKey={(customer, apiKey) => {
                setCopiedKeyId(null);
                setApiKeyViewTarget({ customer, apiKey });
              }}
              onStatusChange={updateCustomerStatus}
            />
          </Card>

          <Card
            title="Atalhos de permissao"
            subtitle="Use estes nomes ao liberar modelos ou combos para um cliente"
          >
            <div className="grid grid-cols-1 gap-4 text-xs text-text-muted lg:grid-cols-2">
              <div>
                <p className="font-semibold text-text-main">Modelos disponiveis</p>
                <p className="mt-2 max-h-28 overflow-auto rounded-lg bg-black/[0.03] p-3 font-mono dark:bg-white/[0.03]">
                  {models
                    .slice(0, 80)
                    .map((model) => model.id)
                    .join(", ") || "Carregando..."}
                </p>
              </div>
              <div>
                <p className="font-semibold text-text-main">Combos disponiveis</p>
                <p className="mt-2 max-h-28 overflow-auto rounded-lg bg-black/[0.03] p-3 font-mono dark:bg-white/[0.03]">
                  {combos.map((combo) => combo.name).join(", ") || "Nenhum combo encontrado"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "plans" && (
        <div className="space-y-6">
          <Card
            title={editingPlanId ? "Editar plano" : "Criar plano"}
            subtitle="Pacote mensal de tokens que sera vendido ao cliente"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_0.8fr_0.8fr_auto_auto_auto] lg:items-end">
              <Input
                label="Nome do plano"
                value={planForm.name}
                onChange={(e) => setPlanForm((s) => ({ ...s, name: e.target.value }))}
              />
              <Input
                label="Tokens por ciclo"
                type="number"
                value={planForm.monthlyTokenLimit}
                onChange={(e) =>
                  setPlanForm((s) => ({ ...s, monthlyTokenLimit: Number(e.target.value) }))
                }
              />
              <Input
                label="Valor mensal (R$)"
                value={planForm.priceMonthlyText}
                onChange={(e) => setPlanForm((s) => ({ ...s, priceMonthlyText: e.target.value }))}
                placeholder="99,00"
              />
              <ToggleLine
                label="Todos modelos"
                checked={planForm.allowAllModels}
                onChange={(checked) => setPlanForm((s) => ({ ...s, allowAllModels: checked }))}
              />
              <ToggleLine
                label="Todos combos"
                checked={planForm.allowAllCombos}
                onChange={(checked) => setPlanForm((s) => ({ ...s, allowAllCombos: checked }))}
              />
              <Button
                onClick={editingPlanId ? saveEditedPlan : createPlan}
                loading={saving}
                icon={editingPlanId ? "save" : "add_card"}
              >
                {editingPlanId ? "Salvar edicao" : "Salvar plano"}
              </Button>
            </div>
            {editingPlanId && (
              <div className="mt-3 flex justify-end">
                <Button size="sm" variant="ghost" onClick={() => setEditingPlanId(null)}>
                  Cancelar edicao
                </Button>
              </div>
            )}
          </Card>

          <Card
            title="Planos cadastrados"
            subtitle="CRUD inicial por API, preparado para a landing page consumir depois"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-text-muted">
                    <th className="py-3 pr-4">Plano</th>
                    <th className="py-3 pr-4">Valor</th>
                    <th className="py-3 pr-4">Tokens mensais</th>
                    <th className="py-3 pr-4">Acesso</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 pr-4 text-right">Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-b border-border/50">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-text-main">{plan.name}</p>
                        <p className="text-xs text-text-muted">{plan.slug}</p>
                      </td>
                      <td className="py-4 pr-4 font-mono">
                        {formatMoneyFromCents(plan.priceMonthlyCents)}
                      </td>
                      <td className="py-4 pr-4 font-mono">
                        {formatTokens(plan.monthlyTokenLimit)}
                      </td>
                      <td className="py-4 pr-4 text-xs text-text-muted">
                        <p>{plan.allowAllModels ? "Todos os modelos" : "Modelos selecionados"}</p>
                        <p>{plan.allowAllCombos ? "Todos os combos" : "Combos selecionados"}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant={plan.isActive ? "success" : "warning"}>
                          {plan.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => startEditPlan(plan)}>
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            loading={saving}
                            onClick={() => updatePlan(plan, { isActive: !plan.isActive })}
                          >
                            {plan.isActive ? "Desativar" : "Ativar"}
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => setPlanPendingDelete(plan)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {plans.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-text-muted">
                        Nenhum plano cadastrado ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "finance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <MetricCard
              label="Tokens consumidos"
              value={formatTokens(totalTokensUsed)}
              icon="query_stats"
            />
            <MetricCard label="Clientes bloqueados" value={blockedCustomers} icon="block" />
            <MetricCard label="Receita" value="Em breve" icon="paid" />
          </div>
          <Card
            title="Financeiro e consumo"
            subtitle="Base para cobranca por milhao de tokens; landing e area do cliente vao consumir estes endpoints"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-text-muted">
                    <th className="py-3 pr-4">Cliente</th>
                    <th className="py-3 pr-4">Plano</th>
                    <th className="py-3 pr-4">Mensalidade</th>
                    <th className="py-3 pr-4">Tokens usados</th>
                    <th className="py-3 pr-4">Limite</th>
                    <th className="py-3 pr-4">Credito extra</th>
                    <th className="py-3 pr-4">Percentual</th>
                    <th className="py-3 pr-4">Bloqueio</th>
                    <th className="py-3 pr-4 text-right">Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border/50">
                      <td className="py-4 pr-4">
                        <p className="font-medium text-text-main">{customer.name}</p>
                        <p className="text-xs text-text-muted">{customer.email}</p>
                      </td>
                      <td className="py-4 pr-4">{customer.planName || "Sem plano"}</td>
                      <td className="py-4 pr-4">
                        <p className="font-mono">
                          {formatMoneyFromCents(customer.priceMonthlyCents || 0)}
                        </p>
                        <p className="text-xs text-text-muted">
                          {customer.billingStatus === "active"
                            ? "Em dia"
                            : customer.billingStatus === "past_due"
                              ? "Vencida"
                              : "Cancelada"}
                        </p>
                        {customer.paidUntil && (
                          <p className="text-xs text-text-muted">
                            Pago ate {new Date(customer.paidUntil).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </td>
                      <td className="py-4 pr-4 font-mono">
                        {formatTokens(customer.usage?.usedTokens || 0)}
                      </td>
                      <td className="py-4 pr-4 font-mono">
                        {formatTokens(customer.usage?.limitTokens || 0)}
                      </td>
                      <td className="py-4 pr-4 font-mono">
                        {formatTokens(customer.extraTokenCredits || 0)}
                      </td>
                      <td className="py-4 pr-4">
                        {formatPercent(customer.usage?.percentUsed || 0)}
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant={customer.usage?.blocked ? "error" : "success"}>
                          {customer.usage?.blockReason === "billing"
                            ? "Mensalidade vencida"
                            : customer.usage?.blockReason === "limit"
                              ? "Limite atingido"
                              : customer.usage?.blocked
                                ? "Bloqueado"
                                : "Liberado"}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markCustomerPaid(customer)}
                          >
                            Renovar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addCustomerCredits(customer)}
                          >
                            + Tokens
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateCustomer(customer, {
                                billingStatus: "past_due",
                                status: "blocked",
                              })
                            }
                          >
                            Marcar vencida
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-text-muted">
                        Nenhum consumo para exibir ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      <Modal
        isOpen={apiKeyViewTarget !== null}
        onClose={() => setApiKeyViewTarget(null)}
        title="Uso exclusivo do admin"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setApiKeyViewTarget(null)}>
              Fechar
            </Button>
            <Button
              icon={copiedKeyId === apiKeyViewTarget?.apiKey.id ? "check" : "content_copy"}
              disabled={!apiKeyViewTarget?.apiKey.key}
              onClick={() => {
                const key = apiKeyViewTarget?.apiKey.key;
                if (key && apiKeyViewTarget) void copyText(key, apiKeyViewTarget.apiKey.id);
              }}
            >
              {copiedKeyId === apiKeyViewTarget?.apiKey.id ? "Copiada" : "Copiar API key"}
            </Button>
          </>
        }
      >
        {apiKeyViewTarget && (
          <div className="space-y-5">
            <div className="flex gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                <span className="material-symbols-outlined">admin_panel_settings</span>
              </div>
              <div>
                <p className="font-semibold text-text-main">
                  Esta chave e sensivel e deve ser manuseada apenas pelo administrador.
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  Copie somente para configurar o cliente ou suporte tecnico autorizado. Nao envie
                  em prints, chats publicos ou para outro cliente.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DeleteDetail label="Cliente" value={apiKeyViewTarget.customer.name} />
              <DeleteDetail
                label="Identificacao"
                value={
                  apiKeyViewTarget.apiKey.label || apiKeyViewTarget.apiKey.keyName || "API Key"
                }
              />
              <DeleteDetail
                label="Status"
                value={apiKeyViewTarget.apiKey.isActive ? "Ativa" : "Inativa"}
              />
              <DeleteDetail
                label="Uso no ciclo"
                value={`${formatTokens(apiKeyViewTarget.apiKey.usedTokens || 0)} tokens`}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-text-main">API key completa</p>
              <code className="mt-2 block max-h-40 overflow-auto break-all rounded-xl border border-border bg-black/[0.04] p-4 text-sm text-text-main dark:bg-black/30">
                {apiKeyViewTarget.apiKey.key || "Chave nao disponivel nesta sessao."}
              </code>
              <p className="mt-2 text-xs text-text-muted">
                Se suspeitar de vazamento, bloqueie o cliente ou gere uma nova chave para ele.
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={customerPendingDelete !== null}
        onClose={() => {
          if (!saving) setCustomerPendingDelete(null);
        }}
        title="Excluir cliente"
        size="lg"
        closeOnOverlay={!saving}
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setCustomerPendingDelete(null)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              icon="delete_forever"
              loading={saving}
              onClick={() => {
                if (customerPendingDelete) void deleteCustomer(customerPendingDelete);
              }}
            >
              Excluir cliente e API keys
            </Button>
          </>
        }
      >
        {customerPendingDelete && (
          <div className="space-y-5">
            <div className="flex gap-4 rounded-2xl border border-red-500/25 bg-red-500/10 p-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                <p className="font-semibold text-text-main">
                  Esta acao remove o cliente e desativa o acesso dele na hora.
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  As API keys SaaS vinculadas tambem serao excluidas. O historico de uso fica
                  preservado para auditoria e relatorios.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DeleteDetail label="Cliente" value={customerPendingDelete.name} />
              <DeleteDetail label="Email" value={customerPendingDelete.email} />
              <DeleteDetail
                label="Plano atual"
                value={customerPendingDelete.planName || "Sem plano"}
              />
              <DeleteDetail
                label="API keys vinculadas"
                value={formatTokens(customerPendingDelete.apiKeys?.length || 0)}
              />
            </div>

            <div className="rounded-xl border border-border bg-black/[0.02] p-4 text-sm text-text-muted dark:bg-white/[0.03]">
              <p className="font-medium text-text-main">Antes de confirmar</p>
              <p className="mt-1">
                Se esse cliente ainda estiver usando a API em algum sistema externo, as chamadas vao
                parar de funcionar apos a exclusao.
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={planPendingDelete !== null}
        onClose={() => {
          if (!saving) setPlanPendingDelete(null);
        }}
        title="Excluir plano"
        size="md"
        closeOnOverlay={!saving}
        footer={
          <>
            <Button variant="ghost" onClick={() => setPlanPendingDelete(null)} disabled={saving}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              icon="delete"
              loading={saving}
              onClick={() => {
                if (planPendingDelete) void deletePlan(planPendingDelete);
              }}
            >
              Excluir plano
            </Button>
          </>
        }
      >
        {planPendingDelete && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4">
              <p className="font-semibold text-text-main">
                Voce esta prestes a excluir o plano &quot;{planPendingDelete.name}&quot;.
              </p>
              <p className="mt-1 text-sm text-text-muted">
                Clientes vinculados podem ficar sem plano ate que outro seja definido.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DeleteDetail
                label="Valor mensal"
                value={formatMoneyFromCents(planPendingDelete.priceMonthlyCents)}
              />
              <DeleteDetail
                label="Tokens"
                value={formatTokens(planPendingDelete.monthlyTokenLimit)}
              />
              <DeleteDetail
                label="Clientes usando"
                value={formatTokens(customersUsingPendingPlan)}
              />
              <DeleteDetail
                label="Status"
                value={planPendingDelete.isActive ? "Ativo" : "Inativo"}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -right-5 -top-8 size-24 rounded-full bg-primary/10" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="mt-1 text-2xl font-bold text-text-main">{value}</p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>
      </div>
    </Card>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-text-main">{label}</label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1 min-h-24 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-text-main shadow-inner dark:border-white/10 dark:bg-white/5"
      />
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

function DeleteDetail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-black/[0.02] p-3 dark:bg-white/[0.03]">
      <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{label}</p>
      <p className="mt-1 break-words font-semibold text-text-main">{value}</p>
    </div>
  );
}

function ToggleLine({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex h-9 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm text-text-main dark:border-white/10">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  );
}

function CustomerTable({
  customers,
  onEditCustomer,
  onDeleteCustomer,
  onViewApiKey,
  onStatusChange,
}: {
  customers: Customer[];
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customer: Customer) => void;
  onViewApiKey: (customer: Customer, apiKey: CustomerApiKey) => void;
  onStatusChange: (customer: Customer, status: Customer["status"]) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-text-muted">
            <th className="py-3 pr-4">Cliente</th>
            <th className="py-3 pr-4">Plano</th>
            <th className="py-3 pr-4">Uso</th>
            <th className="py-3 pr-4">Permissoes</th>
            <th className="py-3 pr-4">Status</th>
            <th className="py-3 pr-4 text-right">Acoes</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            const usage = customer.usage;
            return (
              <tr key={customer.id} className="border-b border-border/50 align-top">
                <td className="py-4 pr-4">
                  <p className="font-semibold text-text-main">{customer.name}</p>
                  <p className="text-xs text-text-muted">{customer.email}</p>
                  {customer.company && (
                    <p className="text-xs text-text-muted">{customer.company}</p>
                  )}
                </td>
                <td className="py-4 pr-4">{customer.planName || "Sem plano"}</td>
                <td className="min-w-56 py-4 pr-4">
                  <p className="font-mono text-xs">
                    {formatTokens(usage?.usedTokens || 0)} / {formatTokens(usage?.limitTokens || 0)}
                  </p>
                  <div className="mt-2 h-2 rounded bg-black/10 dark:bg-white/10">
                    <div
                      className={cn(
                        "h-2 rounded",
                        usage?.blocked ? "bg-red-500" : "bg-emerald-500"
                      )}
                      style={{ width: formatPercent(usage?.percentUsed || 0) }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    {usage?.requestCount || 0} requisicoes neste ciclo
                  </p>
                </td>
                <td className="py-4 pr-4 text-xs">
                  <p>{customer.allowedModels?.length || 0} modelos</p>
                  <p className="text-text-muted">{customer.allowedCombos?.length || 0} combos</p>
                  <p className="text-text-muted">
                    {customer.apiKeys?.filter((key) => key.isActive).length || 0}/
                    {customer.apiKeys?.length || 0} API key(s) ativas
                  </p>
                  {(customer.apiKeys || []).slice(0, 2).map((key) => (
                    <div
                      key={key.id}
                      className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-border/70 bg-black/[0.02] p-2 dark:bg-white/[0.03]"
                    >
                      <div className="min-w-0 flex-1 font-mono text-[11px] text-text-muted">
                        <p className="truncate">{key.label || key.keyName || "key"}</p>
                        <p>
                          {key.keyPreview || "sem preview"} - {formatTokens(key.usedTokens || 0)}{" "}
                          tokens
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="visibility"
                        onClick={() => onViewApiKey(customer, key)}
                      >
                        Ver/Copiar
                      </Button>
                    </div>
                  ))}
                </td>
                <td className="py-4 pr-4">
                  <Badge
                    variant={
                      customer.status === "active"
                        ? "success"
                        : customer.status === "blocked"
                          ? "error"
                          : "warning"
                    }
                  >
                    {statusLabel(customer.status)}
                  </Badge>
                </td>
                <td className="py-4 pr-4 text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEditCustomer(customer)}>
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onStatusChange(customer, "active")}
                    >
                      Ativar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onStatusChange(customer, "blocked")}
                    >
                      Bloquear
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDeleteCustomer(customer)}>
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
          {customers.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-text-muted">
                Nenhum cliente cadastrado ainda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
