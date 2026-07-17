import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Project",
  description: "Documentation",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Journeys', link: '/journeys/' },
      { text: 'Stories', link: '/stories/' },
      { text: 'Traceability', link: '/traceability/' },
    ],
    sidebar: {
      '/journeys/': [{
        text: 'Journeys',
        items: [
          { text: 'Overview', link: '/journeys/' },
          { text: 'Quick Start', link: '/journeys/quick-start' },
        ]
      }],
      '/stories/': [{
        text: 'Stories',
        items: [
          { text: 'Overview', link: '/stories/' },
          { text: 'Hello World', link: '/stories/hello-world' },
        ]
      }],
      '/traceability/': [{
        text: 'Traceability',
        items: [
          { text: 'Overview', link: '/traceability/' },
        ]
      }],
    }
  }
})
