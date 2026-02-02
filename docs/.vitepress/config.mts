import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GNU Octave Wiki mirror",
  description: "GNU Octave Wiki mirror",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    //nav: [
    //  { text: 'Home', link: '/' },
    //  { text: 'Examples', link: '/markdown-examples' }
    //],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Install', link: '/en/install' },
              { text: 'Runtime API Examples', link: '/en/api-examples' }
            ]
          }
        ]
      }
    },
    zh_CN: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh_CN/',
      themeConfig: {
        sidebar: [
          {
            text: '示例',
            items: [
              { text: '安装', link: '/zh_CN/install' },
              { text: '运行时 API 示例', link: '/zh_CN/api-examples' }
            ]
          }
        ]
      }
    }
  }
})
