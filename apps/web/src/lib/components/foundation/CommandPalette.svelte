<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  type Action = { id: string; label: string; hint?: string; run: () => void };

  let open = $state(false);
  let query = $state('');
  let inputEl: HTMLInputElement | null = $state(null);
  let selectedIdx = $state(0);

  const actions: Action[] = [
    { id: 'go-dashboard', label: 'Go to Dashboard', hint: '/dashboard', run: () => nav('/dashboard') },
    { id: 'go-providers', label: 'Go to Providers', hint: '/dashboard/providers', run: () => nav('/dashboard/providers') },
    { id: 'go-usage', label: 'Go to Usage', hint: '/dashboard/usage', run: () => nav('/dashboard/usage') },
    { id: 'go-health', label: 'Go to Health', hint: '/dashboard/health', run: () => nav('/dashboard/health') },
    { id: 'go-settings', label: 'Go to Settings', hint: '/dashboard/settings/general', run: () => nav('/dashboard/settings/general') },
    { id: 'go-security', label: 'Go to Security', hint: '/dashboard/security', run: () => nav('/dashboard/security') },
    { id: 'go-keys', label: 'Go to API Keys', hint: '/dashboard/keys', run: () => nav('/dashboard/keys') },
    { id: 'go-combos', label: 'Go to Combos', hint: '/dashboard/combos', run: () => nav('/dashboard/combos') },
    { id: 'theme-light', label: 'Theme: Light', run: () => setTheme('light') },
    { id: 'theme-dark', label: 'Theme: Dark', run: () => setTheme('dark') },
    { id: 'theme-auto', label: 'Theme: Auto', run: () => setTheme('auto') },
    { id: 'reload', label: 'Reload current page', run: () => location.reload() },
  ];

  const filtered = $derived(
    query
      ? actions.filter((a) => `${a.label} ${a.hint ?? ''}`.toLowerCase().includes(query.toLowerCase()))
      : actions
  );

  function nav(href: string) { open = false; location.href = href; }
  function setTheme(t: 'auto' | 'light' | 'dark') {
    document.documentElement.classList.toggle('dark', t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches));
    localStorage.setItem('argismonitor-theme', t);
    open = false;
  }

  function onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      open = !open;
      query = '';
      selectedIdx = 0;
      queueMicrotask(() => inputEl?.focus());
    } else if (e.key === 'Escape' && open) {
      open = false;
    } else if (open && e.key === 'Enter' && filtered[selectedIdx]) {
      filtered[selectedIdx].run();
    } else if (open && e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIdx = Math.min(selectedIdx + 1, filtered.length - 1);
    } else if (open && e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIdx = Math.max(selectedIdx - 1, 0);
    }
  }

  onMount(() => {
    window.addEventListener('keydown', onKeydown);
  });
  onDestroy(() => {
    if (typeof window !== 'undefined') window.removeEventListener('keydown', onKeydown);
  });
</script>

{#if open}
  <div class="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24" onclick={() => open = false} role="presentation">
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-xl mx-4 overflow-hidden" onclick={(e) => e.stopPropagation()} role="dialog">
      <input
        bind:this={inputEl}
        bind:value={query}
        type="search"
        placeholder="Type a command or search..."
        class="w-full px-4 py-3 text-base border-b border-gray-200 focus:outline-none"
      />
      <ul class="max-h-80 overflow-y-auto">
        {#each filtered as a, i (a.id)}
          <li>
            <button
              type="button"
              onclick={() => a.run()}
              onmouseenter={() => selectedIdx = i}
              class="w-full text-left px-4 py-2 hover:bg-gray-100 {i === selectedIdx ? 'bg-gray-100' : ''}"
            >
              <div class="text-sm font-medium text-gray-900">{a.label}</div>
              {#if a.hint}<div class="text-xs text-gray-500 font-mono">{a.hint}</div>{/if}
            </button>
          </li>
        {/each}
        {#if filtered.length === 0}
          <li class="px-4 py-3 text-sm text-gray-500">No matches</li>
        {/if}
      </ul>
      <div class="px-4 py-2 text-xs text-gray-400 border-t border-gray-100 flex gap-3">
        <span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded">{'<Mod>'}</kbd>+<kbd class="px-1.5 py-0.5 bg-gray-100 rounded">K</kbd> open</span>
        <span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded">↑↓</kbd> navigate</span>
        <span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded">↵</kbd> run</span>
        <span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded">Esc</kbd> close</span>
      </div>
    </div>
  </div>
{/if}
