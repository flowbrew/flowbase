module.exports = {
  siteMetadata: {
    title: "Flow Brew",
    description:
      "Обволакивающий вкус, кремово-ореховое послевкусие и ягодный аромат. Бесплатная доставка по Спб и Москве. Flow Brew",
    url: "https://flowbrew.ru/",
    image: "flow_brew_banner",
    github: {
      repo: "https://github.com/flowbrew/flowbase",
      branch: process.env.GATSBY_BRANCH || "",
      sha: process.env.GATSBY_SHA || "",
    },
    twitter: "@flow_brew",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Annabelle"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          posts: require.resolve("./src/layouts/PostLayout.js"),
          default: require.resolve("./src/layouts/PageLayout.js"),
        },
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/data/`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/content/images/`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Flow Brew: japanese matcha tea`,
        short_name: `Flow Brew`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#0097a7`,
        display: `standalone`,
        icon: `content/images/flow_brew_logo_top.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
