<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import { onMount } from 'svelte';
  type Agent = { id: string; name: string; endpoint: string; version: string; lastSeen: string; status: 'online'|'offline'|'degraded' };
  let agents = $state<Agent[]>([]);
  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/a2a');
    if (r.ok) agents = (await r.json()).agents ?? [];
  });
  const statusColor = { online: 'bg-green-100 text-green-800', offline: 'bg-gray-200 text-gray-700', degraded: 'bg-yellow-100 text-yellow-800' } as const;
</script>

<Card title="A2A agents">
  <p class="text-sm text-gray-600 mb-4">Agent-to-agent registry. Other agents that can be reached via argismonitor.</p>
  {#if agents.length === 0}
    <p class="text-gray-500">No agents registered.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      {#each agents as a (a.id)}
        <div class="border border-gray-200 rounded-lg p-3">
          <div class="flex items-center justify-between mb-1">
            <div class="font-semibold">{a.name}</div>
            <span class="px-2 py-0.5 rounded text-xs font-medium {statusColor[a.status]}">{a.status}</span>
          </div>
          <div class="text-xs text-gray-500 font-mono break-all">{a.endpoint}</div>
          <div class="text-xs text-gray-500 mt-1">v{a.version} · last seen {a.lastSeen}</div>
        </div>
      {/each}
    </div>
  {/if}
</Card>
