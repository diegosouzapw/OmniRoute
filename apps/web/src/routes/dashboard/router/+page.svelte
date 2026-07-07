<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Router = {
    defaultModel: string;
    overrides: { chat: string; code: string; embed: string; image: string; vision: string };
    fallbackChain: string[];
    costBudgetUsd: number;
  };

  let router = $state<Router | null>(null);
  let saving = $state(false);
  let saved = $state(false);

  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/router');
    if (r.ok) router = await r.json();
  });

  async function save() {
    if (!router) return;
    saving = true;
    saved = false;
    try {
      await fetch('http://localhost:4322/api/dashboard/router', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(router),
      });
      saved = true;
    } finally {
      saving = false;
    }
  }
</script>

<Card title="Model router">
  {#if router !== null}
    {@const r = router}
    <div class="space-y-4 max-w-2xl">
      <div>
        <label class="text-sm font-medium text-gray-700">Default model</label>
        <input bind:value={r.defaultModel} class="w-full mt-1 px-3 py-2 border border-gray-300 rounded font-mono text-sm" />
      </div>
      <fieldset>
        <legend class="text-sm font-medium text-gray-700">Per-task overrides</legend>
        <div class="grid grid-cols-2 gap-2 mt-1">
          <label class="text-xs text-gray-600">Chat<input bind:value={r.overrides.chat} class="w-full px-2 py-1 border border-gray-300 rounded font-mono text-sm" /></label>
          <label class="text-xs text-gray-600">Code<input bind:value={r.overrides.code} class="w-full px-2 py-1 border border-gray-300 rounded font-mono text-sm" /></label>
          <label class="text-xs text-gray-600">Embed<input bind:value={r.overrides.embed} class="w-full px-2 py-1 border border-gray-300 rounded font-mono text-sm" /></label>
          <label class="text-xs text-gray-600">Image<input bind:value={r.overrides.image} class="w-full px-2 py-1 border border-gray-300 rounded font-mono text-sm" /></label>
          <label class="text-xs text-gray-600">Vision<input bind:value={r.overrides.vision} class="w-full px-2 py-1 border border-gray-300 rounded font-mono text-sm" /></label>
        </div>
      </fieldset>
      <div>
        <label class="text-sm font-medium text-gray-700">Fallback chain (one model per line)</label>
        <textarea
          rows="4"
          value={r.fallbackChain.join('\n')}
          oninput={(e) => r.fallbackChain = (e.target as HTMLTextAreaElement).value.split('\n').filter((s) => s.trim())}
          class="w-full mt-1 px-3 py-2 border border-gray-300 rounded font-mono text-sm"
        ></textarea>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700">Monthly cost budget (USD)</label>
        <input type="number" step="1" min="0" bind:value={r.costBudgetUsd} class="w-full mt-1 px-3 py-2 border border-gray-300 rounded" />
      </div>
      {#if saved}<p class="text-sm text-green-600">Saved.</p>{/if}
      <Button onclick={save} disabled={saving}>{saving ? 'Saving...' : 'Save router config'}</Button>
    </div>
  {:else}
    <p class="text-gray-500">Loading router config...</p>
  {/if}
</Card>
