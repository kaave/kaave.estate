import path from 'node:path';
import type { GatsbyNode } from 'gatsby';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = async ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      // add plain markdown support
      rules: [{ test: /\.md$/, use: ['raw-loader', 'markdown-loader'] }],
    },
  });
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions: { createPage } }): Promise<void> => {
  const response = await graphql<Queries.BlogEntriesQuery>(`
    query BlogEntries {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/Entries/\\\\d{4}-\\\\d{2}-\\\\d{2}\\\\.md$/" }
          frontmatter: { _2: { published: { eq: true } } }
        }
        sort: { fileAbsolutePath: DESC }
      ) {
        edges {
          node {
            fileAbsolutePath
          }
          previous {
            fileAbsolutePath
            frontmatter {
              _0 {
                title
              }
            }
          }
          next {
            fileAbsolutePath
            frontmatter {
              _0 {
                title
              }
            }
          }
        }
      }
    }
  `);

  response.data?.allMarkdownRemark.edges.forEach(({ node, previous, next }) => {
    if (!node.fileAbsolutePath) return;

    const published = node.fileAbsolutePath.match(/(\d{4}-\d{2}-\d{2})\.md$/)?.[1];

    if (!published) return;

    createPage({
      path: `/blog/${published}`,
      component: path.resolve('./src/templates/blog/entry/index.tsx'),
      context: {
        published,
        fileAbsolutePath: node.fileAbsolutePath,
        ...(!!previous && { previous }),
        ...(!!next && { next }),
      },
    });
  });
};
