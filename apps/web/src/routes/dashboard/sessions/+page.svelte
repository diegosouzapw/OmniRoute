<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Session = { id: string; device: string; ip: string; location: string; lastActive: string; current: boolean };

  let sessions = $state<Session[]>([]);
  let loading = $state(true);
  let signingOut = $state(false);

  async function load() {
    const r = await fetch('http://localhost:4322/api/dashboard/sessions');
    if (r.ok) {
      const j = await r.json();
      sessions = j.sessions ?? [];
    }
    loading = false;
  }
  onMount(load);

  async function revoke(id: string) {
    if (!confirm('Revoke this session?')) return;
    await fetch(`http://localhost:4322/api/dashboard/sessions/${id}`, { method: 'DELETE' });
    sessions = sessions.filter((s) => s.id !== id);
  }

  async function signOutOthers() {
    if (!confirm('Sign out all other sessions? Your current session will remain active.')) return;
    signingOut = true;
    const current = sessions.find((s) => s.current);
    try {
      for (const s of sessions) {
        if (!s.current) await fetch(`http://localhost:4322/api/dashboard/sessions/${s.id}`, { method: 'DELETE' });
      }
      sessions = current ? [current] : [];
    } finally { signingOut = false; }
  }
</script>

<Card title="Active sessions">
  <div class="flex items-center justify-between mb-3">
    <p class="text-sm text-gray-600">{sessions.length} active session(s)</p>
    <Button variant="secondary" onclick={signOutOthers} disabled={signingOut || sessions.length <= 1}>
      {signingOut ? 'Signing out...' : 'Sign out other sessions'}
    </Button>
  </div>

  {#if loading}
    <p class="text-gray-500 text-sm">Loading sessions...</p>
  {:else if sessions.length === 0}
    <p class="text-gray-500 text-sm">No active sessions.</p>
  {:else}
    <table class="w-full text-sm">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="text-left px-3 py-2 font-semibold">Device</th>
          <th class="text-left px-3 py-2 font-semibold">IP</th>
          <th class="text-left px-3 py-2 font-semibold">Location</th>
          <th class="text-left px-3 py-2 font-semibold">Last active</th>
          <th class="text-right px-3 py-2 font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each sessions as s (s.id)}
          <tr class="border-b border-gray-100">
            <td class="px-3 py-2 font-medium">
              {s.device}
              {#if s.current}<span class="ml-2 px-2 py-0.5 rounded text-xs bg-green-100 text-green-800">this session</span>{/if}
            </td>
            <td class="px-3 py-2 font-mono text-xs">{s.ip}</td>
            <td class="px-3 py-2 text-gray-600">{s.location}</td>
            <td class="px-3 py-2 text-gray-500">{new Date(s.lastActive).toLocaleString()}</td>
            <td class="px-3 py-2 text-right">
              {#if !s.current}
                <button class="text-red-600 hover:underline text-sm" onclick={() => revoke(s.id)}>Revoke</button>
              {:else}
                <span class="text-gray-400 text-xs">current</span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</Card>
