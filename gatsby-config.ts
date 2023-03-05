import type { GatsbyConfig } from 'gatsby';
import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV ?? 'development';

dotenv.config();
dotenv.config({ path: `.env.${nodeEnv}` });

const { SITE_TITLE, SITE_URL, ACCOUNT_TWITTER, GOOGLE_ANALYTICS } = process.env;

const config: GatsbyConfig = {
  siteMetadata: {
    title: SITE_TITLE,
    siteUrl: SITE_URL,
    twitter: ACCOUNT_TWITTER,
    ogp: '',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    // for build tools
    'gatsby-plugin-pnpm',
    'gatsby-plugin-tsconfig-paths',
    'gatsby-plugin-postcss',

    // for image optimization
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    // create static site assets
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [GOOGLE_ANALYTICS ?? ''],
        pluginConfig: {
          head: true,
        },
      },
    },
    // for page transition
    'gatsby-plugin-layout',

    // for mdx file type
    'gatsby-plugin-mdx',

    // for portal element
    'gatsby-plugin-portal',

    // build markdown
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // show file title
          'gatsby-remark-prismjs-title',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'entries',
        path: './Entries/',
      },
      __key: 'entries',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    // for mdx
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'templates',
        path: './src/templates/',
      },
      __key: 'templates',
    },
  ],
};

// eslint-disable-next-line import/no-default-export
export default config;
