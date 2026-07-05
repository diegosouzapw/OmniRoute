<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type SecurityInfo = {
    csrfEnabled: boolean;
    jwtSecretRotatedAt: string | null;
    mitmCertInstalled: boolean;
    sessionSecretStrong: boolean;
    openaiApiKeyLeakage: 'safe' | 'warning' | 'unsafe' | 'unknown';
  };

  let info = $state<SecurityInfo | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:4322/api/dashboard/security', { credentials: 'include' });
      if (res.ok) info = await res.json();
      else error = `BFF returned ${res.status}`;
    } catch (err) {
      error = `BFF unreachable: ${(err as Error).message}`;
    } finally {
      loading = false;
    }
  });
</script>

<Card title="Security">
  {#if loading}
    <p class="text-gray-500">Loading security status from BFF...</p>
  {:else if error}
    <p class="text-red-600 text-sm">{error}</p>
  {:else if info}
    <dl class="space-y-3 text-sm">
      <div class="flex items-center justify-between">
        <dt class="text-gray-700">CSRF protection</dt>
        <dd>
          {#if info.csrfEnabled}
            <span class="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">enabled</span>
          {:else}
            <span class="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">disabled</span>
          {/if}
        </dd>
      </div>
      <div class="flex items-center justify-between">
        <dt class="text-gray-700">Session secret strength</dt>
        <dd>
          {#if info.sessionSecretStrong}
            <span class="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">strong</span>
          {:else}
            <span class="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">weak</span>
          {/if}
        </dd>
      </div>
      <div class="flex items-center justify-between">
        <dt class="text-gray-700">MITM CA installed</dt>
        <dd>
          {#if info.mitmCertInstalled}
            <span class="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">yes</span>
          {:else}
            <span class="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">no</span>
          {/if}
        </dd>
      </div>
      <div class="flex items-center justify-between">
        <dt class="text-gray-700">JWT secret last rotated</dt>
        <dd class="text-gray-500">{info.jwtSecretRotatedAt ?? 'never'}</dd>
      </div>
      <div class="flex items-center justify-between">
        <dt class="text-gray-700">API key leakage scan</dt>
        <dd>
          <span class="px-2 py-0.5 rounded text-xs font-medium {info.openaiApiKeyLeakage === 'safe' ? 'bg-green-100 text-green-800' : info.openaiApiKeyLeakage === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">{info.openaiApiKeyLeakage}</span>
        </dd>
      </div>
    </dl>

    <div class="mt-6 flex gap-2">
      <Button>Rotate JWT secret</Button>
      <Button variant="secondary">Re-install MITM CA</Button>
      <Button variant="secondary">Run security scan</Button>
    </div>
  {/if}
</Card>
