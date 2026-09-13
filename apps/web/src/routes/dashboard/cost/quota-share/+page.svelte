<script lang="ts">
  import { onMount } from 'svelte';
  import { bffApiUrl } from '$lib/bff-origin';

  let pools = $state<Record<string, unknown>[]>([]);
  let loading = $state(true);
  let error = $state('');

  onMount(async () => {
    try {
      const res = await fetch(`${bffApiUrl}/api/quota/pools`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      pools = data.pools ?? [];
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load quota share';
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex flex-col gap-6">
  <div>
    <h1 class="text-2xl font-bold">Quota Sharing</h1>
    <p class="text-sm text-text-muted mt-1">Manage shared quota pools across providers.</p>
  </div>

  {#if loading}
    <div class="flex items-center justify-center min-h-[200px]">
      <div class="text-text-muted">Loading quota pools...</div>
    </div>
  {:else if error}
    <div class="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
  {:else if pools.length === 0}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <p class="text-sm text-text-muted">No quota pools configured yet.</p>
    </div>
  {:else}
    {#each pools as pool}
      <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
        <p class="font-medium">Pool: {pool.name ?? pool.id}</p>
      </div>
    {/each}
  {/if}
</div>
