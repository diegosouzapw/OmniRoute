import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OmniRoute',
  description: 'Phenotype AI Gateway Fork — OpenAI-compatible routing with governance',
  cleanUrls: true,
  lastUpdated: true,
  // Don't globally suppress dead-link warnings — surface real broken links during build.
  // Anchors in /getting-started/install.md (on-device-demo, homebrew, docker, bare-metal)
  // resolve correctly via VitePress's default slugification (lowercase, spaces → hyphens).

  head: [
    ['meta', { name: 'theme-color', content: '#0b5fff' }],
    ['meta', { property: 'og:title', content: 'OmniRoute Documentation' }],
    ['meta', {
      property: 'og:description',
      content:
        'OpenAI-compatible routing, retries, load balancing, fallbacks — with governance-grade observability.',
    }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Architecture', link: '/architecture/' },
      { text: 'Operations', link: '/operations/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Demo', link: '/demo/' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/getting-started/' },
            { text: 'Install', link: '/getting-started/install' },
            { text: 'Quickstart', link: '/getting-started/quickstart' },
            { text: 'Deploy', link: '/getting-started/deploy' },
            { text: 'On-device', link: '/getting-started/on-device' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'Repository map', link: '/architecture/repository-map' },
            { text: 'ADR-001', link: '/architecture/adr-001' },
            { text: 'Cluster decisions', link: '/architecture/cluster-decisions' },
          ],
        },
      ],
      '/operations/': [
        {
          text: 'Operations',
          items: [
            { text: 'Overview', link: '/operations/' },
            { text: 'Runbook', link: '/operations/runbook' },
            { text: 'Threat model', link: '/operations/threat-model' },
            { text: 'Incident response', link: '/operations/incident-response' },
            { text: 'Cost', link: '/operations/cost' },
            { text: 'Perf initiative', link: '/operations/perf-initiative' },
            { text: 'Backlog', link: '/operations/backlog' },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Overview', link: '/reference/' },
            { text: 'CLI', link: '/reference/cli' },
            { text: 'API', link: '/reference/api' },
            { text: 'Environment', link: '/reference/environment' },
            { text: 'Feature flags', link: '/reference/feature-flags' },
            { text: 'Provider manifest', link: '/reference/provider-manifest' },
          ],
        },
      ],
      '/demo/': [
        {
          text: 'Demo',
          items: [
            { text: 'Overview', link: '/demo/' },
            { text: 'GUI', link: '/demo/gui' },
            { text: 'Stress test', link: '/demo/stress-test' },
            { text: 'On-device', link: '/demo/on-device' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KooshaPari/OmniRoute' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 KooshaPari',
    },
  },

  // VitePress builds docs-site/ as the VitePress srcDir by default.
  // We use VitePress's default markdown extensions so existing front-matter
  // (layout: home, hero, features) keeps working as-is.
  markdown: {
    config: (md) => {
      // Default VitePress plugins (line-numbers, etc.) are auto-registered.
      // Keep customization here future-proof.
    },
  },
})
