<script lang="ts">
  import { onMount } from 'svelte';
  import { bffApiUrl } from '$lib/bff-origin';

  type Tab = 'news' | 'changelog';

  let activeTab = $state<Tab>('news');
  let news = $state<Record<string, unknown>[]>([]);
  let changelog = $state<Record<string, unknown>[]>([]);
  let loading = $state(true);
  let error = $state('');

  onMount(async () => {
    try {
      const [newsRes, clRes] = await Promise.all([
        fetch(`${bffApiUrl}/api/news`).catch(() => null),
        fetch(`${bffApiUrl}/api/changelog`).catch(() => null),
      ]);

      if (newsRes?.ok) {
        const d = await newsRes.json();
        news = d.items ?? [];
      }
      if (clRes?.ok) {
        const d = await clRes.json();
        changelog = d.entries ?? [];
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load changelog';
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex flex-col gap-6">
  <div class="flex justify-end">
    <div class="flex items-center gap-2">
      <button
        onclick={() => (activeTab = 'news')}
        class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors
          {activeTab === 'news'
            ? 'bg-violet-500 border-violet-500 text-white'
            : 'border-border text-text-muted hover:text-text-main hover:border-violet-500/50'}"
      >
        News
      </button>
      <button
        onclick={() => (activeTab = 'changelog')}
        class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors
          {activeTab === 'changelog'
            ? 'bg-violet-500 border-violet-500 text-white'
            : 'border-border text-text-muted hover:text-text-main hover:border-violet-500/50'}"
      >
        Changelog
      </button>
    </div>
  </div>

  {#if error}
    <div class="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
  {:else if loading}
    <div class="flex items-center justify-center min-h-[500px]">
      <div class="text-text-muted">Loading...</div>
    </div>
  {:else}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 min-h-[500px] overflow-hidden">
      {#if activeTab === 'news'}
        {#if news.length === 0}
          <div class="p-4 text-sm text-text-muted">No news items available.</div>
        {:else}
          {#each news as item}
            <div class="p-4 border-b border-border/40 last:border-0">
              <p class="font-medium">{item.title ?? 'Untitled'}</p>
              <p class="text-sm text-text-muted mt-1">{item.summary ?? item.description ?? ''}</p>
            </div>
          {/each}
        {/if}
      {:else if changelog.length === 0}
        <div class="p-4 text-sm text-text-muted">No changelog entries available.</div>
      {:else}
        {#each changelog as entry}
          <div class="p-4 border-b border-border/40 last:border-0">
            <p class="font-medium">{entry.version ?? entry.title ?? 'Unknown'}</p>
            <p class="text-sm text-text-muted mt-1">{entry.summary ?? entry.description ?? ''}</p>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>
