<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Flag = { key: string; description: string; default: boolean; rollout: number; conditions: string[]; userOverride: boolean | null };
  let flags = $state<Flag[]>([]);
  let saving = $state<string | null>(null);

  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/flags');
    if (r.ok) flags = (await r.json()).flags ?? [];
  });

  async function toggle(f: Flag) {
    saving = f.key;
    try {
      const newValue = !(f.userOverride ?? f.default);
      await fetch(`http://localhost:4322/api/dashboard/flags/${encodeURIComponent(f.key)}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userOverride: newValue }),
      });
      f.userOverride = newValue;
    } finally { saving = null; }
  }
</script>

<Card title="Feature flags (admin)">
  {#if flags.length === 0}
    <p class="text-gray-500">No flags registered.</p>
  {:else}
    <table class="w-full text-sm">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="text-left px-3 py-2 font-semibold">Key</th>
          <th class="text-left px-3 py-2 font-semibold">Description</th>
          <th class="text-right px-3 py-2 font-semibold">Default</th>
          <th class="text-right px-3 py-2 font-semibold">Rollout</th>
          <th class="text-right px-3 py-2 font-semibold">Override</th>
        </tr>
      </thead>
      <tbody>
        {#each flags as f (f.key)}
          <tr class="border-b border-gray-100">
            <td class="px-3 py-2 font-mono text-xs">{f.key}</td>
            <td class="px-3 py-2 text-gray-700">{f.description}</td>
            <td class="px-3 py-2 text-right">{f.default ? 'on' : 'off'}</td>
            <td class="px-3 py-2 text-right">{f.rollout}%</td>
            <td class="px-3 py-2 text-right">
              <Button size="sm" variant={(f.userOverride ?? f.default) ? 'primary' : 'secondary'} onclick={() => toggle(f)} disabled={saving === f.key}>
                {(f.userOverride ?? f.default) ? 'on' : 'off'}
              </Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</Card>
