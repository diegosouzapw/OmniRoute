<script lang="ts">
  import { onMount } from 'svelte';
  import {
    ApiError,
    getComboMetrics,
    getCombos,
    getProviders,
    getStatus,
    type Combo,
    type ComboMetrics,
    type Provider,
    type ServerStatus
  } from '$lib/api';

  type LoadState = 'loading' | 'ready' | 'error';

  let loadState = $state<LoadState>('loading');
  let errorMessage = $state('');
  let status = $state<ServerStatus | null>(null);
  let providers = $state<Provider[]>([]);
  let combos = $state<Combo[]>([]);
  let comboMetrics = $state<ComboMetrics>({});

  const asArray = <T,>(value: T[] | { data?: T[]; providers?: T[]; combos?: T[] } | null): T[] => {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    return value.data ?? value.providers ?? value.combos ?? [];
  };

  const metricNumber = (keys: string[]): number | null => {
    for (const key of keys) {
      const value = comboMetrics[key];
      if (typeof value === 'number' && Number.isFinite(value)) return value;
      if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
        return Number(value);
      }
    }
    return null;
  };

  const providerCount = () => providers.length;

  const activeProviderCount = () =>
    providers.filter((provider) => {
      const enabled = provider.enabled ?? provider.active ?? provider.connected;
      return enabled === undefined ? true : Boolean(enabled);
    }).length;

  const comboCount = () => combos.length;

  const comboTargetCount = () =>
    combos.reduce((total, combo) => {
      const targets = combo.models ?? combo.targets ?? combo.providers ?? [];
      return total + targets.length;
    }, 0);

  const routingStrategyCount = () =>
    new Set(combos.map((combo) => combo.strategy).filter(Boolean)).size;

  const serverOnline = () => status !== null && loadState === 'ready';

  const serverLabel = () => {
    if (loadState === 'loading') return 'Checking';
    if (!serverOnline()) return 'Offline';
    return status?.status ?? status?.state ?? 'Online';
  };

  onMount(async () => {
    loadState = 'loading';
    errorMessage = '';

    try {
      const [statusResult, providerResult, comboResult, metricsResult] = await Promise.all([
        getStatus(),
        getProviders(),
        getCombos(),
        getComboMetrics().catch(() => ({}))
      ]);

      status = statusResult;
      providers = asArray<Provider>(providerResult);
      combos = asArray<Combo>(comboResult);
      comboMetrics = metricsResult;
      loadState = 'ready';
    } catch (error) {
      loadState = 'error';
      errorMessage =
        error instanceof ApiError
          ? `${error.message} (${error.status})`
          : error instanceof Error
            ? error.message
            : 'Unable to reach OmniRoute';
    }
  });
</script>

<svelte:head>
  <title>OmniRoute Dashboard</title>
  <meta
    name="description"
    content="SvelteKit replacement scaffold for the OmniRoute dashboard."
  />
</svelte:head>

<section class="grid gap-5">
  <div class="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-sm font-medium text-cyan-300">Phase 1 scaffold</p>
      <h1 class="mt-2 text-3xl font-semibold text-white">OmniRoute control plane</h1>
      <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
        SvelteKit dashboard shell for provider health, routing posture, and operational shortcuts.
      </p>
    </div>

    <div
      class={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium ${
        serverOnline()
          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
          : loadState === 'loading'
            ? 'border-amber-400/30 bg-amber-400/10 text-amber-100'
            : 'border-rose-400/30 bg-rose-400/10 text-rose-100'
      }`}
    >
      <span
        class={`h-2.5 w-2.5 rounded-full ${
          serverOnline()
            ? 'bg-emerald-300'
            : loadState === 'loading'
              ? 'bg-amber-300'
              : 'bg-rose-300'
        }`}
      ></span>
      {serverLabel()}
    </div>
  </div>

  {#if loadState === 'error'}
    <div class="rounded-lg border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-100">
      {errorMessage}. Requires OmniRoute running on <code class="rounded bg-black/30 px-1.5 py-0.5">:20128</code>.
    </div>
  {/if}

  <div class="grid gap-4 md:grid-cols-3">
    <article class="rounded-lg border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-black/20">
      <p class="text-sm font-medium text-slate-400">Server status</p>
      <div class="mt-4 flex items-end justify-between gap-3">
        <p class="text-3xl font-semibold text-white">{serverLabel()}</p>
        <span class="rounded-md bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-200">
          GET /api/v1/status
        </span>
      </div>
      <p class="mt-4 text-sm text-slate-400">
        {status?.version ? `Version ${status.version}` : 'Version unavailable until the server responds.'}
      </p>
    </article>

    <article class="rounded-lg border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-black/20">
      <p class="text-sm font-medium text-slate-400">Providers</p>
      <div class="mt-4 flex items-end justify-between gap-3">
        <p class="text-4xl font-semibold text-white">{providerCount()}</p>
        <span class="rounded-md bg-violet-400/10 px-2 py-1 text-xs font-medium text-violet-200">
          {activeProviderCount()} active
        </span>
      </div>
      <p class="mt-4 text-sm text-slate-400">
        Provider connections loaded from <code class="rounded bg-white/10 px-1.5 py-0.5">/api/v1/providers</code>.
      </p>
    </article>

    <article class="rounded-lg border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-black/20">
      <p class="text-sm font-medium text-slate-400">Combo routing</p>
      <div class="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p class="text-2xl font-semibold text-white">{comboCount()}</p>
          <p class="mt-1 text-xs text-slate-500">combos</p>
        </div>
        <div>
          <p class="text-2xl font-semibold text-white">{comboTargetCount()}</p>
          <p class="mt-1 text-xs text-slate-500">targets</p>
        </div>
        <div>
          <p class="text-2xl font-semibold text-white">{routingStrategyCount()}</p>
          <p class="mt-1 text-xs text-slate-500">strategies</p>
        </div>
      </div>
      <p class="mt-4 text-sm text-slate-400">
        {#if metricNumber(['successRate', 'success_rate', 'success']) !== null}
          Success metric: {metricNumber(['successRate', 'success_rate', 'success'])}
        {:else}
          Quick stats from <code class="rounded bg-white/10 px-1.5 py-0.5">/api/combos</code>.
        {/if}
      </p>
    </article>
  </div>

  <div class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
    <section class="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-lg font-semibold text-white">Routing snapshot</h2>
        <span class="text-xs text-slate-500">live API read</span>
      </div>
      <div class="mt-5 grid gap-3 sm:grid-cols-2">
        {#each combos.slice(0, 4) as combo}
          <div class="rounded-md border border-white/10 bg-black/20 p-4">
            <p class="truncate text-sm font-medium text-white">{combo.name ?? combo.id ?? 'Unnamed combo'}</p>
            <p class="mt-2 text-xs text-slate-500">
              {combo.strategy ?? 'priority'} routing
            </p>
          </div>
        {:else}
          <p class="text-sm text-slate-400">No combo routes returned yet.</p>
        {/each}
      </div>
    </section>

    <section class="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <h2 class="text-lg font-semibold text-white">Next porting lanes</h2>
      <div class="mt-5 grid gap-3 text-sm text-slate-300">
        <div class="flex items-center justify-between gap-3 rounded-md bg-black/20 px-3 py-2">
          <span>Providers</span>
          <span class="text-cyan-200">route shell ready</span>
        </div>
        <div class="flex items-center justify-between gap-3 rounded-md bg-black/20 px-3 py-2">
          <span>Logs</span>
          <span class="text-slate-500">pending port</span>
        </div>
        <div class="flex items-center justify-between gap-3 rounded-md bg-black/20 px-3 py-2">
          <span>Keys</span>
          <span class="text-slate-500">pending port</span>
        </div>
      </div>
    </section>
  </div>
</section>
