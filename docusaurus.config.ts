import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "メモ.txt",
  tagline: "就職してから現在までに学んだことをまとめています。",
  favicon: "img/m.ico",

  // Set the production url of your site here
  url: "https://hayashida-atsushi.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/training/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "hayashida-atsushi", // Usually your GitHub org/user name.
  projectName: "training", // Usually your repo name.

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja"],
  },
  //検索エンジンにindexされないようにする。
  noIndex: true,
  stylesheets: [
    {
      href: "./src/css/custom.css", // カスタムCSSファイルのパスを指定
      type: "text/css",
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/theme.ts"),
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  //ここを編集するとサイドバーを編集できる
  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "メモ.txt",
      logo: {
        alt: "My Site Logo",
        src: "img/m.png",
      },
      items: [
        /** TODO:
        {to: '/blog', label: 'Blog', position: 'left'},
        */
        {
          type: "docSidebar",
          sidebarId: "study",
          position: "left",
          label: "Study",
        },
        {
          type: "docSidebar",
          sidebarId: "docusaurusMemo",
          position: "left",
          label: "Docusaurus memo",
        },
        {
          href: "https://github.com/hayashida-atsushi/training",
          className: "github",
          position: "right",
        },
        // https://github.com/facebook/docusaurus/issues/2634
        {
          to: "/settings/Settings",
          position: "right",
          className: "setting",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Study",
              to: "/docs/study",
            },
          ],
        },
        {
          title: "More",
          items: [
            /** TODO:
            {
              label: 'Blog',
              to: '/blog',
            },*/
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
