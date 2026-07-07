<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  type Step = 1 | 2 | 3;
  let step = $state<Step>(1);
  let currentKey = $state('omni_pk_demo_xxxxxxxxxxxxxxxxxxxx');
  let newKey = $state<string | null>(null);
  let confirmed = $state(false);
  let rotating = $state(false);

  async function rotate() {
    rotating = true;
    try {
      const r = await fetch('http://localhost:4322/api/dashboard/keys-rotation', { method: 'POST' });
      if (r.ok) {
        const j = await r.json();
        newKey = j.newKey;
        step = 2;
      }
    } finally { rotating = false; }
  }

  function downloadEnv() {
    if (!newKey) return;
    const blob = new Blob([`ARGIS_API_KEY=${newKey}\n`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'argis.env';
    a.click();
    URL.revokeObjectURL(url);
  }

  function confirm() {
    confirmed = true;
    step = 3;
  }
</script>

<Card title="Rotate API key">
  <ol class="space-y-4">
    <li class="flex items-start gap-3 {step >= 1 ? '' : 'opacity-50'}">
      <span class="w-7 h-7 rounded-full flex items-center justify-center font-semibold {step > 1 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}">1</span>
      <div class="flex-1">
        <div class="font-medium">Current key</div>
        <code class="block mt-1 px-3 py-2 bg-gray-100 rounded text-sm font-mono break-all">{currentKey}</code>
        <p class="text-xs text-gray-500 mt-1">This is your current API key. After rotation, it will be revoked.</p>
        <Button onclick={rotate} disabled={rotating} class="mt-2">{rotating ? 'Rotating...' : 'Rotate now'}</Button>
      </div>
    </li>

    <li class="flex items-start gap-3 {step >= 2 ? '' : 'opacity-50'}">
      <span class="w-7 h-7 rounded-full flex items-center justify-center font-semibold {step > 2 ? 'bg-green-500 text-white' : step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}">2</span>
      <div class="flex-1">
        <div class="font-medium">New key (one-time display)</div>
        {#if newKey}
          <code class="block mt-1 px-3 py-2 bg-yellow-50 border border-yellow-300 rounded text-sm font-mono break-all">{newKey}</code>
          <p class="text-xs text-red-600 mt-1">Copy this now. You won't see it again.</p>
          <div class="mt-2 flex gap-2">
            <Button onclick={downloadEnv}>Download .env</Button>
            <Button onclick={confirm}>I've stored this key</Button>
          </div>
        {:else}
          <p class="text-xs text-gray-500 mt-1">Click 'Rotate now' above to generate a new key.</p>
        {/if}
      </div>
    </li>

    <li class="flex items-start gap-3 {step >= 3 ? '' : 'opacity-50'}">
      <span class="w-7 h-7 rounded-full flex items-center justify-center font-semibold {step === 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}">3</span>
      <div class="flex-1">
        <div class="font-medium">Confirm</div>
        {#if confirmed}
          <p class="text-sm text-green-600 mt-1">API key rotated. The old key is revoked.</p>
        {:else}
          <p class="text-xs text-gray-500 mt-1">Confirm you've stored the new key above.</p>
        {/if}
      </div>
    </li>
  </ol>
</Card>
