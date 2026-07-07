<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Prefs = {
    channels: { email: boolean; push: boolean; inApp: boolean };
    events: { outage: boolean; comboHealth: boolean; usageSpike: boolean; release: boolean };
    dailyDigest: { enabled: boolean; time: string };
  };

  let prefs = $state<Prefs | null>(null);
  let saving = $state(false);
  let saved = $state(false);
  let testing = $state(false);
  let testResult = $state<string | null>(null);

  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/notifications');
    if (r.ok) prefs = await r.json();
  });

  async function save() {
    if (!prefs) return;
    saving = true;
    try {
      await fetch('http://localhost:4322/api/dashboard/notifications', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(prefs) });
      saved = true;
    } finally { saving = false; }
  }

  async function test() {
    testing = true;
    testResult = null;
    try {
      const r = await fetch('http://localhost:4322/api/dashboard/notifications/test', { method: 'POST' });
      if (r.ok) {
        const j = await r.json();
        testResult = `Test sent to ${j.sentTo}`;
      }
    } finally { testing = false; }
  }
</script>

{#if prefs}
  <Card title="Notification preferences">
    <div class="grid grid-cols-2 gap-6 max-w-3xl">
      <div>
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Channels</h3>
        <div class="space-y-2">
          {#each Object.entries(prefs.channels) as [k, v]}
            <label class="flex items-center gap-2">
              <input type="checkbox" bind:checked={prefs.channels[k]} class="rounded" />
              <span class="text-sm capitalize">{k}</span>
            </label>
          {/each}
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Events</h3>
        <div class="space-y-2">
          {#each Object.entries(prefs.events) as [k, v]}
            <label class="flex items-center gap-2">
              <input type="checkbox" bind:checked={prefs.events[k]} class="rounded" />
              <span class="text-sm capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
            </label>
          {/each}
        </div>
      </div>
    </div>

    <div class="mt-4 border-t border-gray-200 pt-4 max-w-3xl">
      <label class="flex items-center gap-2">
        <input type="checkbox" bind:checked={prefs.dailyDigest.enabled} class="rounded" />
        <span class="text-sm font-medium text-gray-700">Daily digest</span>
      </label>
      {#if prefs.dailyDigest.enabled}
        <label class="block mt-2 ml-6">
          <span class="text-xs text-gray-500">Send at</span>
          <input type="time" bind:value={prefs.dailyDigest.time} class="ml-2 px-2 py-1 border border-gray-300 rounded" />
        </label>
      {/if}
    </div>

    <div class="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4">
      <Button onclick={test} disabled={testing} variant="secondary">{testing ? 'Sending...' : 'Send test notification'}</Button>
      {#if testResult}<span class="text-sm text-green-600">{testResult}</span>{/if}
      <div class="ml-auto flex items-center gap-2">
        {#if saved}<span class="text-sm text-green-600">Saved.</span>{/if}
        <Button onclick={save} disabled={saving}>{saving ? 'Saving...' : 'Save preferences'}</Button>
      </div>
    </div>
  </Card>
{/if}
