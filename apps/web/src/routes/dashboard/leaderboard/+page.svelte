<script lang="ts">
  import { onMount } from 'svelte';
  import { bffApiUrl } from '$lib/bff-origin';

  type Scope = 'global' | 'weekly' | 'monthly' | 'tokens_shared';
  const SCOPES: { value: Scope; label: string }[] = [
    { value: 'global', label: 'All Time' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'tokens_shared', label: 'Tokens Shared' },
  ];
  const MEDAL = ['🥇', '🥈', '🥉'];
  let scope = $state<Scope>('global');
  let entries = $state<{ apiKeyId: string; score: number; name?: string }[]>([]);
  let myRank = $state<number | null>(null);
  let loading = $state(true);
  let error = $state('');
  const top3 = $derived(entries.slice(0, 3));
  const rest = $derived(entries.slice(3));

  function label(e: { apiKeyId: string; name?: string }) {
    return e.name?.trim() || `${e.apiKeyId.slice(0, 8)}...`;
  }

  async function fetchLeaderboard(s: Scope) {
    loading = true; error = '';
    try {
      const res = await fetch(`${bffApiUrl}/api/gamification/leaderboard?scope=${s}&limit=50`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      entries = data.entries ?? [];
      myRank = data.myRank ?? null;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load leaderboard';
    } finally { loading = false; }
  }

  onMount(() => { void fetchLeaderboard(scope); });
  function switchScope(s: Scope) { scope = s; void fetchLeaderboard(s); }
</script>

<div class="flex flex-col gap-6">
  <div>
    <h1 class="text-2xl font-bold">Leaderboard</h1>
    <p class="text-sm text-text-muted mt-1">See top contributors and their scores.</p>
  </div>

  <div class="flex items-center gap-2 flex-wrap">
    {#each SCOPES as s}
      <button
        onclick={() => switchScope(s.value)}
        class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors
          {scope === s.value
            ? 'bg-violet-500 border-violet-500 text-white'
            : 'border-border text-text-muted hover:text-text-main hover:border-violet-500/50'}"
      >
        {s.label}
      </button>
    {/each}
  </div>

  {#if myRank !== null}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <p class="text-sm text-text-muted">Your Rank</p>
      <p class="text-3xl font-bold mt-1">#{myRank}</p>
    </div>
  {/if}

  {#if error}
    <div class="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
  {:else if loading}
    <div class="flex items-center justify-center min-h-[200px]">
      <div class="text-text-muted">Loading leaderboard...</div>
    </div>
  {:else}
    {#if top3.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each top3 as entry, idx}
          <div class="relative overflow-hidden rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
            <div class="text-4xl">{MEDAL[idx]}</div>
            <p class="text-sm text-text-muted truncate mt-2" title={entry.apiKeyId}>{label(entry)}</p>
            <p class="text-2xl font-bold mt-1">{entry.score.toLocaleString()}</p>
          </div>
        {/each}
      </div>
    {/if}

    {#if rest.length > 0}
      <div class="rounded-lg border border-border/40 bg-bg-subtle/30">
        <table class="w-full">
          <thead>
            <tr class="text-left text-sm text-text-muted border-b border-border">
              <th class="px-4 py-3 font-medium">#</th>
              <th class="px-4 py-3 font-medium">Provider</th>
              <th class="px-4 py-3 font-medium text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {#each rest as entry, idx}
              <tr class="border-b border-border/40 last:border-0">
                <td class="px-4 py-3 text-sm text-text-muted">{idx + 4}</td>
                <td class="px-4 py-3 text-sm truncate" title={entry.apiKeyId}>{label(entry)}</td>
                <td class="px-4 py-3 text-sm text-right font-mono">{entry.score.toLocaleString()}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    {#if entries.length === 0}
      <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
        <p class="text-sm text-text-muted">No leaderboard entries yet.</p>
      </div>
    {/if}
  {/if}
</div>
