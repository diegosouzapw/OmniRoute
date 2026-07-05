<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Combo = {
    id: string;
    name: string;
    primary: string;
    fallbacks: string[];
    strategy: 'first-success' | 'round-robin' | 'cost-optimized' | 'latency-optimized';
    successRate: number;
    avgLatencyMs: number;
  };

  let combos = $state<Combo[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:4322/api/dashboard/combos', { credentials: 'include' });
      if (res.ok) {
        const j = await res.json();
        combos = j.combos ?? [];
      } else error = `BFF returned ${res.status}`;
    } catch (err) {
      error = `BFF unreachable: ${(err as Error).message}`;
    } finally {
      loading = false;
    }
  });

  const strategyColor: Record<Combo['strategy'], string> = {
    'first-success': 'bg-blue-100 text-blue-800',
    'round-robin': 'bg-purple-100 text-purple-800',
    'cost-optimized': 'bg-green-100 text-green-800',
    'latency-optimized': 'bg-yellow-100 text-yellow-800',
  };
</script>

<Card title="Combos">
  <p class="text-sm text-gray-600 mb-4">Combos orchestrate fallback across multiple providers/models. The current Next.js editor is 4,629 LoC; this is the Svelte 5 rewrite.</p>

  <div class="flex items-center justify-between mb-4">
    <input
      type="search"
      placeholder="Filter combos..."
      class="flex-1 px-3 py-2 border border-gray-300 rounded mr-3"
    />
    <Button>+ New combo</Button>
  </div>

  {#if loading}
    <p class="text-gray-500">Loading combos from BFF...</p>
  {:else if error}
    <p class="text-red-600 text-sm">{error}</p>
  {:else if combos.length === 0}
    <p class="text-gray-500">No combos yet. Create one to set up fallback routing.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each combos as c (c.id)}
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold">{c.name}</h3>
            <span class="px-2 py-0.5 rounded text-xs font-medium {strategyColor[c.strategy]}">{c.strategy}</span>
          </div>
          <div class="text-sm space-y-1">
            <div><span class="text-gray-500">Primary:</span> <span class="font-mono">{c.primary}</span></div>
            <div><span class="text-gray-500">Fallbacks:</span> <span class="font-mono">{c.fallbacks.length ? c.fallbacks.join(', ') : '—'}</span></div>
            <div class="flex gap-4 pt-1 text-xs text-gray-500">
              <span>Success: {(c.successRate * 100).toFixed(1)}%</span>
              <span>Avg latency: {c.avgLatencyMs}ms</span>
            </div>
          </div>
          <div class="mt-3 flex gap-2">
            <button class="text-blue-600 hover:underline text-sm">Edit</button>
            <button class="text-red-600 hover:underline text-sm">Delete</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</Card>
