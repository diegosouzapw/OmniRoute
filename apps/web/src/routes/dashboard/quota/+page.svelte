<script lang="ts">
  import { onMount } from 'svelte';
  import { bffApiUrl } from '$lib/bff-origin';

  let quota = $state<Record<string, unknown>>({});
  let autoRefresh = $state(false);
  let refreshInterval = $state(180);
  let loading = $state(true);
  let error = $state('');

  onMount(async () => {
    try {
      const res = await fetch(`${bffApiUrl}/api/settings`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      quota = data;
      if (typeof data.autoRefreshProviderQuota === 'boolean') {
        autoRefresh = data.autoRefreshProviderQuota;
      }
      if (typeof data.autoRefreshProviderQuotaInterval === 'number') {
        refreshInterval = data.autoRefreshProviderQuotaInterval;
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load quota settings';
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex flex-col gap-6">
  <div>
    <h1 class="text-2xl font-bold">Quota Management</h1>
    <p class="text-sm text-text-muted mt-1">Monitor and configure provider quota limits and auto-refresh.</p>
  </div>

  {#if loading}
    <div class="flex items-center justify-center min-h-[200px]">
      <div class="text-text-muted">Loading quota...</div>
    </div>
  {:else if error}
    <div class="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
  {:else}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-text-muted">Auto-refresh Provider Quota</p>
          <p class="text-lg font-semibold">{autoRefresh ? 'Enabled' : 'Disabled'}</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-text-muted">Refresh Interval</p>
          <p class="text-lg font-semibold">{refreshInterval}s</p>
        </div>
      </div>
    </div>
  {/if}
</div>
