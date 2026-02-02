import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GNU Octave Wiki mirror",
  description: "GNU Octave Wiki mirror",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh_CN: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh_CN/'
    }
  }
})
