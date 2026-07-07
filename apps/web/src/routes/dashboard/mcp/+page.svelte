<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';
  type McpServer = { id: string; name: string; transport: 'stdio'|'http'|'sse'; endpoint: string; enabled: boolean; tools: number };
  let servers = $state<McpServer[]>([]);
  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/mcp');
    if (r.ok) servers = (await r.json()).servers ?? [];
  });
</script>

<Card title="MCP servers">
  <p class="text-sm text-gray-600 mb-4">Connect MCP-compliant tool servers so agents can call tools through argismonitor.</p>
  <div class="flex justify-end mb-4"><Button>+ Add server</Button></div>
  {#if servers.length === 0}
    <p class="text-gray-500">No MCP servers connected yet.</p>
  {:else}
    <table class="w-full text-sm">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr><th class="text-left px-3 py-2 font-semibold">Name</th><th class="text-left px-3 py-2 font-semibold">Transport</th><th class="text-left px-3 py-2 font-semibold">Endpoint</th><th class="text-right px-3 py-2 font-semibold">Tools</th><th class="text-right px-3 py-2 font-semibold">Enabled</th></tr>
      </thead>
      <tbody>
        {#each servers as s (s.id)}
          <tr class="border-b border-gray-100"><td class="px-3 py-2 font-medium">{s.name}</td><td class="px-3 py-2">{s.transport}</td><td class="px-3 py-2 font-mono text-xs">{s.endpoint}</td><td class="px-3 py-2 text-right">{s.tools}</td><td class="px-3 py-2 text-right">{s.enabled ? 'yes' : 'no'}</td></tr>
        {/each}
      </tbody>
    </table>
  {/if}
</Card>
