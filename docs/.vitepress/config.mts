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
      { icon: 'github', link: 'https://github.com/TC999/octave-wiki' }
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
            text: 'Categories',
            items: [
              { text: '🏠 GNU Octave Wiki', link: '/en' },
              { text: '⚙️ Install', link: '/en/install' },
              { text: '🔬 Development', link: '/en/development' }
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
            text: '类别',
            items: [
              { text: '🏠 GNU Octave Wiki', link: '/zh_CN' },
              { text: '⚙️ 安装', link: '/zh_CN/install' },
              { text: '🔬 开发', link: '/zh_CN/development' }
            ]
          }
        ]
      }
    }
  }
})
