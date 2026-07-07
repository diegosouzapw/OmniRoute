<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Stats = { gcfBytes: number; toonBytes: number; jsonBytes: number; prompts: number };
  let stats = $state<Stats | null>(null);
  let input = $state('');
  let gcfOut = $state('');
  let toonOut = $state('');
  let jsonOut = $state('');
  let encoding = $state(false);
  let rateThreshold = $state(0.5);
  let latencyTarget = $state(200);
  let sizeBudget = $state(4096);

  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/compression/stats');
    if (r.ok) stats = await r.json();
  });

  async function encode() {
    if (!input.trim()) return;
    encoding = true;
    try {
      const r = await fetch('http://localhost:4322/api/dashboard/compression/ab', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      if (r.ok) {
        const j = await r.json();
        gcfOut = j.gcf ?? '';
        toonOut = j.toon ?? '';
        jsonOut = j.json ?? '';
      }
    } finally {
      encoding = false;
    }
  }

  const maxBytes = $derived(Math.max(1, stats?.jsonBytes ?? 1, jsonOut.length || 1));
</script>

<Card title="Compression studio">
  {#if stats}
    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="border border-gray-200 rounded p-3">
        <div class="text-xs text-gray-500">GCF</div>
        <div class="text-2xl font-bold">{stats.gcfBytes.toLocaleString()}</div>
        <div class="text-xs text-gray-500">bytes ({((1 - stats.gcfBytes / Math.max(1, stats.jsonBytes)) * 100).toFixed(1)}% saved)</div>
      </div>
      <div class="border border-gray-200 rounded p-3">
        <div class="text-xs text-gray-500">TOON</div>
        <div class="text-2xl font-bold">{stats.toonBytes.toLocaleString()}</div>
        <div class="text-xs text-gray-500">bytes ({((1 - stats.toonBytes / Math.max(1, stats.jsonBytes)) * 100).toFixed(1)}% saved)</div>
      </div>
      <div class="border border-gray-200 rounded p-3">
        <div class="text-xs text-gray-500">JSON</div>
        <div class="text-2xl font-bold">{stats.jsonBytes.toLocaleString()}</div>
        <div class="text-xs text-gray-500">bytes (baseline)</div>
      </div>
    </div>
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="text-sm font-medium text-gray-700">Input</label>
      <textarea
        bind:value={input}
        rows="6"
        class="w-full mt-1 px-3 py-2 border border-gray-300 rounded font-mono text-sm"
        placeholder="Paste a prompt, JSON, or conversation to encode..."
      ></textarea>
      <div class="mt-2"><Button onclick={encode} disabled={encoding}>
        {encoding ? 'Encoding...' : 'Encode all 3'}
      </Button></div>
    </div>

    <div class="space-y-2">
      <div>
        <div class="text-xs text-gray-500 mb-1">GCF</div>
        <pre class="bg-gray-50 p-2 rounded font-mono text-xs overflow-x-auto h-20">{gcfOut || '—'}</pre>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">TOON</div>
        <pre class="bg-gray-50 p-2 rounded font-mono text-xs overflow-x-auto h-20">{toonOut || '—'}</pre>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">JSON</div>
        <pre class="bg-gray-50 p-2 rounded font-mono text-xs overflow-x-auto h-20">{jsonOut || '—'}</pre>
      </div>
    </div>
  </div>

  <details class="mt-6">
    <summary class="cursor-pointer text-sm font-medium text-gray-700">Headroom settings</summary>
    <div class="mt-3 grid grid-cols-3 gap-3 text-sm">
      <label>Rate threshold<input type="number" step="0.05" min="0" max="1" bind:value={rateThreshold} class="w-full mt-1 px-2 py-1 border border-gray-300 rounded" /></label>
      <label>Latency target (ms)<input type="number" step="50" min="50" bind:value={latencyTarget} class="w-full mt-1 px-2 py-1 border border-gray-300 rounded" /></label>
      <label>Size budget (bytes)<input type="number" step="256" min="256" bind:value={sizeBudget} class="w-full mt-1 px-2 py-1 border border-gray-300 rounded" /></label>
    </div>
  </details>
</Card>
