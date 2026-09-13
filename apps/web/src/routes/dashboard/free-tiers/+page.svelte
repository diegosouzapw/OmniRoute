<script lang="ts">
  import { onMount } from 'svelte';
  import { bffApiUrl } from '$lib/bff-origin';

  let tiers = $state<Record<string, unknown>[]>([]);
  let loading = $state(true);
  let error = $state('');

  onMount(async () => {
    try {
      const res = await fetch(`${bffApiUrl}/api/free-tiers`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      tiers = data.tiers ?? [];
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load free tiers';
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex flex-col gap-6">
  <div>
    <h1 class="text-2xl font-bold">Free Tier Overview</h1>
    <p class="text-sm text-text-muted mt-1">View available free tier quotas and usage.</p>
  </div>

  {#if loading}
    <div class="flex items-center justify-center min-h-[200px]">
      <div class="text-text-muted">Loading free tiers...</div>
    </div>
  {:else if error}
    <div class="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
  {:else if tiers.length === 0}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <p class="text-sm text-text-muted">No free tier data available.</p>
    </div>
  {:else}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <p class="text-sm text-text-muted">{tiers.length} free tier(s) available.</p>
      <pre class="mt-2 text-xs overflow-auto">{JSON.stringify(tiers, null, 2)}</pre>
    </div>
  {/if}
</div>
