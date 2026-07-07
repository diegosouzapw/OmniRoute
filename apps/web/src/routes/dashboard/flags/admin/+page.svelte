<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Flag = { key: string; description: string; default: boolean; rollout: number; conditions: string[]; userOverride: boolean | null; notes?: string };
  let flags = $state<Flag[]>([]);
  let loading = $state(true);
  let showCreate = $state(false);
  let newKey = $state('');
  let newDescription = $state('');
  let newDefault = $state(false);
  let newRollout = $state(100);
  let newNotes = $state('');
  let saving = $state(false);

  async function load() {
    const r = await fetch('http://localhost:4322/api/dashboard/flags');
    if (r.ok) {
      const j = await r.json();
      flags = j.flags ?? [];
    }
    loading = false;
  }
  onMount(load);

  async function setOverride(key: string, value: boolean | null) {
    await fetch(`http://localhost:4322/api/dashboard/flags/${encodeURIComponent(key)}`, {
      method: 'PUT', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userOverride: value }),
    });
    await load();
  }

  async function create() {
    if (!newKey.trim()) return;
    saving = true;
    try {
      await fetch('http://localhost:4322/api/dashboard/flags', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          key: newKey.trim(), description: newDescription, default: newDefault,
          rollout: newRollout, conditions: [], notes: newNotes, userOverride: null,
        }),
      });
      newKey = ''; newDescription = ''; newDefault = false; newRollout = 100; newNotes = '';
      showCreate = false;
      await load();
    } finally { saving = false; }
  }
</script>

<Card title="Feature flags admin">
  <div class="flex items-center justify-between mb-3">
    <p class="text-sm text-gray-600">{flags.length} flag(s) registered</p>
    <Button onclick={() => showCreate = !showCreate}>+ New flag</Button>
  </div>

  {#if showCreate}
    <div class="border border-gray-200 rounded p-3 mb-4 bg-gray-50">
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="text-xs text-gray-500">Key (a-z, 0-9, -, _)</span>
          <input bind:value={newKey} pattern="[a-z0-9_-]+" placeholder="my-feature-flag" class="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-sm font-mono" />
        </label>
        <label class="block">
          <span class="text-xs text-gray-500">Description</span>
          <input bind:value={newDescription} class="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-sm" />
        </label>
        <label class="flex items-center gap-2 col-span-2">
          <input type="checkbox" bind:checked={newDefault} class="rounded" />
          <span class="text-sm">Default on</span>
        </label>
        <label class="block">
          <span class="text-xs text-gray-500">Rollout: {newRollout}%</span>
          <input type="range" min="0" max="100" bind:value={newRollout} class="w-full" />
        </label>
        <label class="block col-span-2">
          <span class="text-xs text-gray-500">Notes</span>
          <textarea bind:value={newNotes} rows="2" class="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-sm"></textarea>
        </label>
      </div>
      <div class="mt-2 flex gap-2">
        <Button onclick={create} disabled={saving || !newKey.trim()}>{saving ? 'Creating...' : 'Create flag'}</Button>
        <Button variant="ghost" onclick={() => showCreate = false}>Cancel</Button>
      </div>
    </div>
  {/if}

  {#if loading}
    <p class="text-gray-500 text-sm">Loading flags...</p>
  {:else if flags.length === 0}
    <p class="text-gray-500 text-sm">No flags yet.</p>
  {:else}
    <table class="w-full text-sm">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="text-left px-3 py-2 font-semibold">Key</th>
          <th class="text-left px-3 py-2 font-semibold">Description</th>
          <th class="text-right px-3 py-2 font-semibold">Default</th>
          <th class="text-right px-3 py-2 font-semibold">Rollout</th>
          <th class="text-right px-3 py-2 font-semibold">User override</th>
        </tr>
      </thead>
      <tbody>
        {#each flags as f (f.key)}
          <tr class="border-b border-gray-100">
            <td class="px-3 py-2 font-mono text-xs">{f.key}</td>
            <td class="px-3 py-2 text-gray-600">{f.description}</td>
            <td class="px-3 py-2 text-right">{f.default ? 'on' : 'off'}</td>
            <td class="px-3 py-2 text-right">{f.rollout}%</td>
            <td class="px-3 py-2 text-right">
              <Button size="sm" variant={f.userOverride === null ? 'secondary' : (f.userOverride ? 'primary' : 'ghost')} onclick={() => setOverride(f.key, f.userOverride === null ? true : f.userOverride ? null : false)}>
                {f.userOverride === null ? 'unset' : f.userOverride ? 'on' : 'off'}
              </Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</Card>
