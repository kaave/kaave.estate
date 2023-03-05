/**
 * @file
 * gatsby ssr configs.
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

import type { GatsbySSR } from 'gatsby';

export const onRenderBody: GatsbySSR['onRenderBody'] = (args) => args.setHtmlAttributes({ lang: 'ja' });
