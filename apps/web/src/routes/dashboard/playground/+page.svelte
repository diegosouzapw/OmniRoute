<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Model = { id: string; name: string; provider: string };
  let models = $state<Model[]>([]);
  let model = $state('');
  let systemPrompt = $state('You are a helpful assistant.');
  let userPrompt = $state('');
  let temperature = $state(0.7);
  let streaming = $state(false);
  let response = $state('');
  let latencyMs = $state<number | null>(null);
  let tokens = $state<number | null>(null);
  let cost = $state<number | null>(null);

  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/playground/models');
    if (r.ok) {
      const j = await r.json();
      models = j.models ?? [];
      if (models.length && !model) model = models[0].id;
    }
  });

  async function stream() {
    if (!model || !userPrompt.trim()) return;
    streaming = true;
    response = '';
    const start = performance.now();
    try {
      const r = await fetch('http://localhost:4322/api/dashboard/playground/stream', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ model, systemPrompt, userPrompt, temperature }),
      });
      if (!r.ok || !r.body) {
        response = `Error: ${r.status}`;
        return;
      }
      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const j = JSON.parse(data);
              if (j.token) response += j.token;
              if (j.tokens) tokens = j.tokens;
              if (j.cost) cost = j.cost;
            } catch {}
          }
        }
      }
      latencyMs = Math.round(performance.now() - start);
    } finally {
      streaming = false;
    }
  }
</script>

<Card title="Playground">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-3">
      <div>
        <label class="text-sm font-medium text-gray-700">Model</label>
        <select bind:value={model} class="w-full mt-1 px-3 py-2 border border-gray-300 rounded">
          {#each models as m}<option value={m.id}>{m.name} ({m.provider})</option>{/each}
        </select>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700">System prompt</label>
        <textarea bind:value={systemPrompt} rows="3" class="w-full mt-1 px-3 py-2 border border-gray-300 rounded font-mono text-sm"></textarea>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700">User prompt</label>
        <textarea bind:value={userPrompt} rows="6" class="w-full mt-1 px-3 py-2 border border-gray-300 rounded"></textarea>
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700">Temperature: {temperature.toFixed(2)}</label>
        <input type="range" min="0" max="2" step="0.05" bind:value={temperature} class="w-full" />
      </div>
      <Button onclick={stream} disabled={streaming || !model}>
        {streaming ? 'Streaming...' : 'Run'}
      </Button>
    </div>
    <div>
      <label class="text-sm font-medium text-gray-700">Response</label>
      <div class="mt-1 p-3 border border-gray-300 rounded bg-gray-50 min-h-96 max-h-[600px] overflow-y-auto whitespace-pre-wrap font-mono text-sm">{response || '—'}</div>
      {#if latencyMs !== null || tokens !== null || cost !== null}
        <div class="mt-2 flex gap-4 text-sm text-gray-500">
          {#if latencyMs !== null}<span>latency: <b class="text-gray-900">{latencyMs}ms</b></span>{/if}
          {#if tokens !== null}<span>tokens: <b class="text-gray-900">{tokens}</b></span>{/if}
          {#if cost !== null}<span>cost: <b class="text-gray-900">${cost.toFixed(5)}</b></span>{/if}
        </div>
      {/if}
    </div>
  </div>
</Card>
