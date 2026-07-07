<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';
  type Skill = { id: string; name: string; description: string; version: string; installed: boolean; category: string };
  let skills = $state<Skill[]>([]);
  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/skills');
    if (r.ok) skills = (await r.json()).skills ?? [];
  });
</script>

<Card title="Skills marketplace">
  <p class="text-sm text-gray-600 mb-4">Install reusable agent skills (prompt templates + tool bindings) into this argismonitor instance.</p>
  {#if skills.length === 0}
    <p class="text-gray-500">No skills available.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      {#each skills as s (s.id)}
        <div class="border border-gray-200 rounded-lg p-3 flex items-start justify-between gap-3">
          <div>
            <div class="font-semibold">{s.name} <span class="text-xs text-gray-500">v{s.version}</span></div>
            <div class="text-xs text-gray-500 mb-1">{s.category}</div>
            <p class="text-sm text-gray-700">{s.description}</p>
          </div>
          <Button variant={s.installed ? 'secondary' : 'primary'} size="sm">
            {s.installed ? 'Installed' : 'Install'}
          </Button>
        </div>
      {/each}
    </div>
  {/if}
</Card>
