<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';

  type Stat = { label: string; value: string; delta?: string };
  const stats: Stat[] = [
    { label: 'Active providers', value: '160+', delta: '+5 this week' },
    { label: 'Requests today', value: '—', delta: 'pending BFF' },
    { label: 'Avg latency', value: '—', delta: 'pending BFF' },
    { label: 'Cost (30d)', value: '—', delta: 'pending BFF' },
  ];
</script>

<div class="space-y-6">
  <h1 class="text-3xl font-bold">Dashboard</h1>
  <p class="text-gray-600">argismonitor v4 home. Live stats from the BFF pending.</p>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each stats as s}
      <Card>
        <div class="text-sm text-gray-500">{s.label}</div>
        <div class="text-3xl font-bold mt-1">{s.value}</div>
        {#if s.delta}
          <div class="text-xs text-gray-400 mt-2">{s.delta}</div>
        {/if}
      </Card>
    {/each}
  </div>

  <Card title="Next steps">
    <ol class="list-decimal pl-5 space-y-2 text-gray-700">
      <li>Phase 1.7: <a href="/login" class="text-blue-600 underline">/login</a> - sign in form (live)</li>
      <li>Phase 1.8: <a href="/callback" class="text-blue-600 underline">/callback</a> - OAuth return (live)</li>
      <li>Phase 1.9: <a href="/dashboard" class="text-blue-600 underline">/dashboard</a> - this page (live)</li>
      <li>Phase 1.10: <a href="/dashboard/providers" class="text-blue-600 underline">/dashboard/providers</a> - DataTable (live)</li>
      <li>Phase 1.11: <a href="/dashboard/settings/general" class="text-blue-600 underline">/dashboard/settings/general</a> - sveltekit-superforms (live)</li>
      <li>Phase 1.12: <a href="/dashboard/health" class="text-blue-600 underline">/dashboard/health</a> - Hono SSE (live)</li>
      <li>Phase 1.13: <a href="/dashboard/usage" class="text-blue-600 underline">/dashboard/usage</a> - DataTable (live)</li>
    </ol>
  </Card>
</div>
