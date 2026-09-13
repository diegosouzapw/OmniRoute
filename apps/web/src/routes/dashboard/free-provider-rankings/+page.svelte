<script lang="ts">
  import { onMount } from 'svelte';
  import { bffApiUrl } from '$lib/bff-origin';

  interface Ranking { id: string; name: string; score: number; category: string; authType: string; }
  const CATEGORIES = [
    { value: '', label: 'All Categories' },
    { value: 'default', label: 'Default' },
    { value: 'coding', label: 'Coding' },
    { value: 'review', label: 'Review' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'debugging', label: 'Debugging' },
  ];
  let rankings = $state<Ranking[]>([]);
  let loading = $state(true);
  let error = $state('');
  let filter = $state('');
  let configuredOnly = $state(false);
  let availableOnly = $state(false);

  function scoreColor(s: number) {
    if (s >= 0.85) return 'text-green-400';
    if (s >= 0.7) return 'text-emerald-400';
    if (s >= 0.55) return 'text-yellow-400';
    return 'text-orange-400';
  }

  async function fetchRankings() {
    loading = true; error = '';
    try {
      const p = new URLSearchParams({ withUsage: '1', usageRange: '24h' });
      if (filter) p.set('category', filter);
      if (configuredOnly) p.set('configuredOnly', '1');
      if (availableOnly) p.set('availableOnly', '1');
      const res = await fetch(`${bffApiUrl}/api/free-provider-rankings?${p}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      rankings = (await res.json()).rankings ?? [];
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load rankings';
    } finally { loading = false; }
  }

  onMount(() => { void fetchRankings(); });
</script>

<div class="flex flex-col gap-6">
  <div>
    <h1 class="text-2xl font-bold">Free Provider Rankings</h1>
    <p class="text-sm text-text-muted mt-1">Rankings of free-tier providers by capability and reliability.</p>
  </div>

  <div class="flex items-center gap-2 flex-wrap">
    {#each CATEGORIES as cat}
      <button onclick={() => { filter = cat.value; void fetchRankings(); }}
        class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors {filter === cat.value ? 'bg-violet-500 border-violet-500 text-white' : 'border-border text-text-muted hover:text-text-main hover:border-violet-500/50'}">
        {cat.label}
      </button>
    {/each}
  </div>

  <div class="flex items-center gap-2 flex-wrap">
    <button onclick={() => { configuredOnly = !configuredOnly; void fetchRankings(); }} aria-pressed={configuredOnly}
      class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors {configuredOnly ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border text-text-muted hover:text-text-main hover:border-emerald-500/50'}">
      Configured Only
    </button>
    <button onclick={() => { availableOnly = !availableOnly; void fetchRankings(); }} aria-pressed={availableOnly}
      class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors {availableOnly ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border text-text-muted hover:text-text-main hover:border-emerald-500/50'}">
      Available Only
    </button>
  </div>

  {#if error}
    <div class="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
  {:else if loading}
    <div class="flex items-center justify-center min-h-[200px]">
      <div class="text-text-muted">Loading rankings...</div>
    </div>
  {:else if rankings.length === 0}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <p class="text-sm text-text-muted">No free provider rankings available.</p>
    </div>
  {:else}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30">
      <table class="w-full">
        <thead>
          <tr class="text-left text-sm text-text-muted border-b border-border">
            <th class="px-4 py-3 font-medium">#</th>
            <th class="px-4 py-3 font-medium">Provider</th>
            <th class="px-4 py-3 font-medium">Category</th>
            <th class="px-4 py-3 font-medium text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {#each rankings as ranking, idx}
            <tr class="border-b border-border/40 last:border-0">
              <td class="px-4 py-3 text-sm text-text-muted">{idx + 1}</td>
              <td class="px-4 py-3 text-sm font-medium">{ranking.name}</td>
              <td class="px-4 py-3 text-sm text-text-muted capitalize">{ranking.category}</td>
              <td class="px-4 py-3 text-sm text-right font-mono {scoreColor(ranking.score)}">
                {ranking.score.toFixed(2)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
