<script lang="ts">
  import '../app.css';
  import CommandPalette from '$lib/components/foundation/CommandPalette.svelte';
  import { page } from '$app/stores';
  import { t, getLocale, setLocale, supportedLanguages } from '$lib/i18n';

  let { children } = $props();

  const nav = [
    { href: '/dashboard', key: 'nav.dashboard' },
    { href: '/dashboard/providers', key: 'nav.providers' },
    { href: '/dashboard/combos', key: 'nav.combos' },
    { href: '/dashboard/keys', key: 'nav.keys' },
    { href: '/dashboard/usage', key: 'nav.usage' },
    { href: '/dashboard/cost', key: 'nav.cost' },
    { href: '/dashboard/billing', key: 'nav.billing' },
    { href: '/dashboard/compression', key: 'nav.cost' },
    { href: '/dashboard/playground', key: 'nav.usage' },
    { href: '/dashboard/router', key: 'nav.settings' },
    { href: '/dashboard/observability', key: 'nav.health' },
    { href: '/dashboard/diagnostics', key: 'nav.health' },
    { href: '/dashboard/logs', key: 'nav.logs' },
    { href: '/dashboard/memory', key: 'nav.memory' },
    { href: '/dashboard/cache', key: 'nav.cache' },
    { href: '/dashboard/batch', key: 'nav.batch' },
    { href: '/dashboard/webhooks', key: 'nav.webhooks' },
    { href: '/dashboard/audit', key: 'nav.audit' },
    { href: '/dashboard/mcp', key: 'nav.mcp' },
    { href: '/dashboard/a2a', key: 'nav.a2a' },
    { href: '/dashboard/skills', key: 'nav.skills' },
    { href: '/dashboard/flags', key: 'nav.settings' },
    { href: '/dashboard/security', key: 'nav.security' },
    { href: '/dashboard/settings/general', key: 'nav.settings' },
  ];
</script>

<CommandPalette />

<main class="min-h-screen bg-[var(--color-surface)]">
  <header class="border-b border-gray-200 bg-white">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6 flex-wrap">
      <a href="/dashboard" class="text-xl font-bold" style="color: var(--color-primary)">{t('app.title')}</a>
      <nav class="flex gap-1 flex-wrap">
        {#each nav as item}
          <a
            href={item.href}
            class="px-2.5 py-1 text-xs rounded hover:bg-gray-100 {$page.url.pathname === item.href ? 'bg-gray-100 font-semibold' : 'text-gray-700'}"
          >
            {t(item.key)}
          </a>
        {/each}
      </nav>
      <div class="ml-auto text-sm text-gray-500 flex items-center gap-3">
        <select value={getLocale()} onchange={(e) => setLocale((e.target as HTMLSelectElement).value)} class="px-2 py-1 border border-gray-300 rounded text-sm">
          {#each supportedLanguages as lang}
            <option value={lang}>{lang}</option>
          {/each}
        </select>
        <span class="hidden md:inline">{t('app.tagline')}</span>
        <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{'<Mod>'}+K</kbd>
      </div>
    </div>
  </header>
  <div class="max-w-7xl mx-auto px-4 py-6">
    {@render children?.()}
  </div>
</main>
