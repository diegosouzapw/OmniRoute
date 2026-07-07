<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { onMount } from 'svelte';

  type Profile = { displayName: string; email: string; bio: string; avatarUrl: string; theme: 'auto'|'light'|'dark'; language: string };

  let profile = $state<Profile | null>(null);
  let saving = $state(false);
  let saved = $state(false);

  onMount(async () => {
    const r = await fetch('http://localhost:4322/api/dashboard/profile');
    if (r.ok) profile = await r.json();
  });

  async function save() {
    if (!profile) return;
    saving = true;
    try {
      await fetch('http://localhost:4322/api/dashboard/profile', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(profile),
      });
      saved = true;
    } finally { saving = false; }
  }
</script>

{#if profile}
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
    <Card title="Avatar">
      {#if profile.avatarUrl}
        <img src={profile.avatarUrl} alt="avatar" class="w-32 h-32 rounded-full mx-auto" />
      {:else}
        <div class="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-4xl text-gray-500">
          {profile.displayName?.[0]?.toUpperCase() ?? '?'}
        </div>
      {/if}
      <p class="text-center mt-3 text-sm text-gray-500">{profile.email}</p>
      <label class="block mt-3">
        <span class="text-xs text-gray-500">Avatar URL</span>
        <input bind:value={profile.avatarUrl} placeholder="https://..." class="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-sm" />
      </label>
    </Card>

    <Card title="Profile">
      <div class="space-y-3">
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Display name</span>
          <input bind:value={profile.displayName} class="w-full mt-1 px-3 py-2 border border-gray-300 rounded" />
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Email (read-only)</span>
          <input value={profile.email} readonly class="w-full mt-1 px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600" />
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Bio</span>
          <textarea bind:value={profile.bio} rows="3" class="w-full mt-1 px-3 py-2 border border-gray-300 rounded"></textarea>
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Theme</span>
          <select bind:value={profile.theme} class="w-full mt-1 px-3 py-2 border border-gray-300 rounded">
            <option value="auto">auto (system)</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Language</span>
          <select bind:value={profile.language} class="w-full mt-1 px-3 py-2 border border-gray-300 rounded">
            <option value="en">English</option>
            <option value="es">Espanol</option>
            <option value="ja">Nihongo</option>
            <option value="zh-CN">Zhongwen</option>
          </select>
        </label>
        {#if saved}<p class="text-sm text-green-600">Saved.</p>{/if}
        <Button onclick={save} disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</Button>
      </div>
    </Card>
  </div>
{/if}
