import { browser } from '$app/environment';

type Theme = 'auto' | 'light' | 'dark';

function createThemeStore() {
  let value = $state<Theme>('auto');

  if (browser) {
    const stored = localStorage.getItem('argismonitor-theme') as Theme | null;
    if (stored === 'auto' || stored === 'light' || stored === 'dark') {
      value = stored;
    }
    applyTheme(value);
  }

  function applyTheme(t: Theme) {
    if (!browser) return;
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
    } else if (t === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    }
  }

  return {
    get value() { return value; },
    set(t: Theme) {
      value = t;
      if (browser) localStorage.setItem('argismonitor-theme', t);
      applyTheme(t);
    },
  };
}

export const theme = createThemeStore();
