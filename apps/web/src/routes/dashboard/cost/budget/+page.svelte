<script lang="ts">
  import { onMount } from 'svelte';
  import { bffApiUrl } from '$lib/bff-origin';

  let budget = $state<Record<string, unknown> | null>(null);
  let loading = $state(true);
  let error = $state('');

  onMount(async () => {
    try {
      const res = await fetch(`${bffApiUrl}/api/usage/budget`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      budget = await res.json();
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load budget';
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex flex-col gap-6">
  <div>
    <h1 class="text-2xl font-bold">Budget Overview</h1>
    <p class="text-sm text-text-muted mt-1">Monitor your spending budgets and limits.</p>
  </div>

  {#if loading}
    <div class="flex items-center justify-center min-h-[200px]">
      <div class="text-text-muted">Loading budget...</div>
    </div>
  {:else if error}
    <div class="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
  {:else}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <p class="text-sm text-text-muted">Budget data loaded successfully.</p>
      <pre class="mt-2 text-xs overflow-auto">{JSON.stringify(budget, null, 2)}</pre>
    </div>
  {/if}
</div>
