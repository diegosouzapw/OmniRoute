<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type ApiKey = {
    id: string;
    name: string;
    prefix: string;
    createdAt: string;
    lastUsedAt: string | null;
    revoked: boolean;
  };

  let keys = $state<ApiKey[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let showCreate = $state(false);
  let newKeyName = $state('');

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:4322/api/dashboard/keys', { credentials: 'include' });
      if (res.ok) {
        const j = await res.json();
        keys = j.keys ?? [];
      } else error = `BFF returned ${res.status}`;
    } catch (err) {
      error = `BFF unreachable: ${(err as Error).message}`;
    } finally {
      loading = false;
    }
  });

  async function createKey() {
    if (!newKeyName.trim()) return;
    const res = await fetch('http://localhost:4322/api/dashboard/keys', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: newKeyName }),
    });
    if (res.ok) {
      const j = await res.json();
      keys = [j.key, ...keys];
      newKeyName = '';
      showCreate = false;
    }
  }

  async function revoke(id: string) {
    await fetch(`http://localhost:4322/api/dashboard/keys/${id}/revoke`, { method: 'POST', credentials: 'include' });
    keys = keys.map((k) => (k.id === id ? { ...k, revoked: true } : k));
  }
</script>

<Card title="API keys">
  <div class="flex items-center justify-between mb-4">
    <p class="text-sm text-gray-600">Manage the API keys that can call /v1/* on your behalf.</p>
    <Button onclick={() => showCreate = !showCreate}>+ New key</Button>
  </div>

  {#if showCreate}
    <div class="border border-gray-200 rounded p-3 mb-4 bg-gray-50 flex gap-2">
      <input
        type="text"
        placeholder="Key name (e.g. my-laptop)"
        bind:value={newKeyName}
        class="flex-1 px-3 py-2 border border-gray-300 rounded"
      />
      <Button onclick={createKey}>Create</Button>
      <Button variant="ghost" onclick={() => showCreate = false}>Cancel</Button>
    </div>
  {/if}

  {#if loading}
    <p class="text-gray-500">Loading API keys from BFF...</p>
  {:else if error}
    <p class="text-red-600 text-sm">{error}</p>
  {:else if keys.length === 0}
    <p class="text-gray-500">No API keys yet.</p>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="text-left px-3 py-2 font-semibold">Name</th>
            <th class="text-left px-3 py-2 font-semibold">Prefix</th>
            <th class="text-left px-3 py-2 font-semibold">Created</th>
            <th class="text-left px-3 py-2 font-semibold">Last used</th>
            <th class="text-right px-3 py-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each keys as k (k.id)}
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="px-3 py-2 font-medium">{k.name}</td>
              <td class="px-3 py-2 font-mono text-xs">{k.prefix}...</td>
              <td class="px-3 py-2 text-gray-500">{new Date(k.createdAt).toLocaleString()}</td>
              <td class="px-3 py-2 text-gray-500">{k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString() : 'never'}</td>
              <td class="px-3 py-2 text-right">
                {#if k.revoked}
                  <span class="text-xs text-gray-400">revoked</span>
                {:else}
                  <button class="text-red-600 hover:underline text-sm" onclick={() => revoke(k.id)}>Revoke</button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</Card>
