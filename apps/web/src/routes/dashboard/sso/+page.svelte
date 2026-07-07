<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type SSO = { enabled: boolean; provider: 'google'|'github'|'microsoft'|'saml'; allowedDomains: string[] };
  let sso = $state<SSO | null>(null);
  let newDomain = $state('');
  let saving = $state(false);
  let saved = $state(false);
  let testing = $state(false);
  let testResult = $state<string | null>(null);

  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/sso');
    if (r.ok) sso = await r.json();
  });

  async function save() {
    if (!sso) return;
    saving = true;
    try {
      await fetch('http://localhost:4322/api/dashboard/sso', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(sso) });
      saved = true;
    } finally { saving = false; }
  }

  function addDomain() {
    if (!sso || !newDomain.trim()) return;
    sso.allowedDomains = [...sso.allowedDomains, newDomain.trim()];
    newDomain = '';
  }
  function removeDomain(d: string) {
    if (!sso) return;
    sso.allowedDomains = sso.allowedDomains.filter((x) => x !== d);
  }

  async function test() {
    testing = true;
    testResult = null;
    try {
      const r = await fetch('http://localhost:4322/api/dashboard/sso/test', { method: 'POST' });
      if (r.ok) testResult = 'OK - SSO endpoint reachable';
      else testResult = `Failed: ${r.status}`;
    } finally { testing = false; }
  }
</script>

{#if sso}
  <Card title="Single Sign-On">
    <div class="space-y-4 max-w-2xl">
      <label class="flex items-center gap-2">
        <input type="checkbox" bind:checked={sso.enabled} class="rounded" />
        <span class="text-sm font-medium text-gray-700">Enable SSO</span>
      </label>

      <label class="block">
        <span class="text-sm font-medium text-gray-700">Provider</span>
        <select bind:value={sso.provider} class="w-full mt-1 px-3 py-2 border border-gray-300 rounded">
          <option value="google">Google</option>
          <option value="github">GitHub</option>
          <option value="microsoft">Microsoft</option>
          <option value="saml">Custom SAML</option>
        </select>
      </label>

      <div>
        <span class="text-sm font-medium text-gray-700">Allowed email domains</span>
        <div class="mt-1 flex gap-2">
          <input bind:value={newDomain} placeholder="example.com" class="flex-1 px-3 py-2 border border-gray-300 rounded" onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addDomain())} />
          <Button onclick={addDomain}>Add</Button>
        </div>
        {#if sso.allowedDomains.length > 0}
          <ul class="mt-2 flex flex-wrap gap-1">
            {#each sso.allowedDomains as d}
              <li class="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-sm">
                {d}
                <button class="text-red-500 hover:bg-red-50 rounded px-1" onclick={() => removeDomain(d)}>×</button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <div class="flex items-center gap-2 pt-2 border-t border-gray-200">
        <Button onclick={test} disabled={testing} variant="secondary">
          {testing ? 'Testing...' : 'Test connection'}
        </Button>
        {#if testResult}
          <span class="text-sm {testResult.startsWith('OK') ? 'text-green-600' : 'text-red-600'}">{testResult}</span>
        {/if}
        <div class="ml-auto flex items-center gap-2">
          {#if saved}<span class="text-sm text-green-600">Saved.</span>{/if}
          <Button onclick={save} disabled={saving}>{saving ? 'Saving...' : 'Save SSO config'}</Button>
        </div>
      </div>
    </div>
  </Card>
{/if}
