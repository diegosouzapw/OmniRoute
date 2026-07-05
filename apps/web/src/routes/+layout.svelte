<script lang="ts">
  import '../app.css';
  import CommandPalette from '$lib/components/foundation/CommandPalette.svelte';
  import { page } from '$app/stores';

  let { children } = $props();

  const nav = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/providers', label: 'Providers' },
    { href: '/dashboard/combos', label: 'Combos' },
    { href: '/dashboard/keys', label: 'API Keys' },
    { href: '/dashboard/usage', label: 'Usage' },
    { href: '/dashboard/health', label: 'Health' },
    { href: '/dashboard/security', label: 'Security' },
    { href: '/dashboard/settings/general', label: 'Settings' },
  ];
</script>

<CommandPalette />

<main class="min-h-screen bg-[var(--color-surface)]">
  <header class="border-b border-gray-200 bg-white">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
      <a href="/dashboard" class="text-xl font-bold" style="color: var(--color-primary)">OmniRoute v4</a>
      <nav class="flex gap-1 flex-wrap">
        {#each nav as item}
          <a
            href={item.href}
            class="px-3 py-1.5 text-sm rounded hover:bg-gray-100 {$page.url.pathname === item.href ? 'bg-gray-100 font-semibold' : 'text-gray-700'}"
          >
            {item.label}
          </a>
        {/each}
      </nav>
      <div class="ml-auto text-sm text-gray-500 flex items-center gap-3">
        <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{'<Mod>'}+K</kbd>
        <span>command</span>
      </div>
    </div>
  </header>
  <div class="max-w-7xl mx-auto px-4 py-6">
    {@render children?.()}
  </div>
</main>
