<script lang="ts">
  import { onMount } from 'svelte';
  import { bffApiUrl } from '$lib/bff-origin';

  interface TranslationStatus {
    locale: string;
    progress: number;
    missingKeys: string[];
  }

  let status = $state<TranslationStatus[]>([]);
  let loading = $state(true);
  let error = $state('');

  onMount(async () => {
    try {
      const res = await fetch(`${bffApiUrl}/api/i18n/status`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      status = data.locales ?? [];
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load translation status';
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex flex-col gap-6">
  <div>
    <h1 class="text-2xl font-bold">Translation Status</h1>
    <p class="text-sm text-text-muted mt-1">Monitor i18n translation coverage across locales.</p>
  </div>

  {#if loading}
    <div class="flex items-center justify-center min-h-[200px]">
      <div class="text-text-muted">Loading translation status...</div>
    </div>
  {:else if error}
    <div class="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
  {:else if status.length === 0}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <p class="text-sm text-text-muted">No translation data available.</p>
    </div>
  {:else}
    <div class="rounded-lg border border-border/40 bg-bg-subtle/30">
      <table class="w-full">
        <thead>
          <tr class="text-left text-sm text-text-muted border-b border-border">
            <th class="px-4 py-3 font-medium">Locale</th>
            <th class="px-4 py-3 font-medium">Progress</th>
            <th class="px-4 py-3 font-medium text-right">Missing Keys</th>
          </tr>
        </thead>
        <tbody>
          {#each status as locale}
            <tr class="border-b border-border/40 last:border-0">
              <td class="px-4 py-3 text-sm font-medium uppercase">{locale.locale}</td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-32 rounded-full bg-border/40 overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all
                        {locale.progress >= 0.9 ? 'bg-emerald-500' : locale.progress >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'}"
                      style="width: {Math.round(locale.progress * 100)}%"
                    ></div>
                  </div>
                  <span class="text-text-muted">{Math.round(locale.progress * 100)}%</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-right text-text-muted">{locale.missingKeys.length}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
