/* eslint-disable no-underscore-dangle */
import { BlogTemplate } from '@/templates/blog';
import { HeadTemplate } from '@/templates/HeadTemplate';
import type { HeadFC, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';

export const Head: HeadFC<Queries.BlogIndexPageQuery> = ({ data }) => {
  const { siteMetadata } = data.site ?? { siteMetadata: { title: '', siteUrl: '' } };
  const { title = '' } = siteMetadata ?? { title: '' };

  return <HeadTemplate title={`Blog | ${title ?? ''}`} ogType="blog" />;
};

type TemplateProps = ComponentProps<typeof BlogTemplate>;

const BlogPage = ({ data }: PageProps<Queries.BlogIndexPageQuery>): JSX.Element => {
  const entries = useMemo(
    () =>
      data.allMarkdownRemark.edges.reduce<TemplateProps['entries']>(
        (acc, { node: { frontmatter, fileAbsolutePath } }) => {
          const title = frontmatter?._0?.title;
          const published = new Date(fileAbsolutePath?.match(/(\d{4}-\d{2}-\d{2})\.md$/)?.[1] ?? '');

          // `Invalid Date` を判定
          if (Number.isNaN(published.getTime()) || title == null) return acc;
          const year = published.getFullYear();

          return {
            ...acc,
            [year]: [...(acc[year] ?? []), { published, title }],
          };
        },
        {},
      ),
    [data.allMarkdownRemark.edges],
  );

  console.log(data, entries);
  return <BlogTemplate entries={entries} />;
};

export default BlogPage;

export const query = graphql`
  query BlogIndexPage {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/Entries/\\d{4}-\\d{2}-\\d{2}\\.md$/" }
        frontmatter: { _2: { published: { eq: true } } }
      }
      sort: { fileAbsolutePath: DESC }
    ) {
      edges {
        node {
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
`;
