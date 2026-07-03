<script lang="ts">
  import type { Snippet } from 'svelte';
  import './layout.css';

  const navItems = [
    { href: '/providers', label: 'Providers' },
    { href: '/settings', label: 'Settings' },
    { href: '/logs', label: 'Logs' },
    { href: '/models', label: 'Models' },
    { href: '/keys', label: 'Keys' },
    { href: '/combo', label: 'Combo' }
  ];

  let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-slate-950 text-slate-100">
  <div class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_32rem)]"></div>

  <div class="relative grid min-h-screen lg:grid-cols-[17rem_1fr]">
    <aside class="border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <a href="/" class="flex items-center gap-3">
        <span class="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
          OR
        </span>
        <span>
          <span class="block text-base font-semibold text-white">OmniRoute</span>
          <span class="block text-xs text-slate-500">SvelteKit console</span>
        </span>
      </a>

      <nav class="mt-6 flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
        {#each navItems as item}
          <a
            class="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
            href={item.href}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </aside>

    <main class="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        {@render children()}
      </div>
    </main>
  </div>
</div>
