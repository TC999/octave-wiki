import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GNU Octave Wiki mirror",
  description: "GNU Octave Wiki mirror",
  ignoreDeadLinks: true, // 临时解决方案，等待修复
  srcDir: "./",
  base: "/octave-wiki/",
  srcExclude: ["node_modules/**/*"],
  rewrites: {
    'en/:rest*': ':rest*'
  },
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
        ],
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },

        outline: {
          label: '页面导航'
        },

        lastUpdated: {
          text: '最后更新于'
        },

        notFound: {
        title: '页面未找到',
        quote:
          '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
        linkLabel: '前往首页',
        linkText: '带我回首页'
        },
      }
    }
  }
})
