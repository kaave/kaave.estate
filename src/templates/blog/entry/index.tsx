/* eslint-disable no-underscore-dangle, react/forbid-component-props */
/**
 * @file `entry#show` page template
 */

import { HeadTemplate } from '@/templates/HeadTemplate';
import { format } from 'date-fns';
import type { HeadFC, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import { GatsbyImage } from 'gatsby-plugin-image';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import * as styles from './index.module.css';
import { Contents } from './parts/Contents';
import { PrevNext } from './parts/PrevNext';
import { Toc } from './parts/Toc';

type PageContext = {
  /** yyyy-MM-dd */
  published: string;
  /** previous entry's `contentful_id` if it created. */
  previous?: Queries.BlogEntriesQuery['allMarkdownRemark']['edges'][number]['previous'];
  /** next entry's `contentful_id` if it created. */
  next?: Queries.BlogEntriesQuery['allMarkdownRemark']['edges'][number]['next'];
};

export const Head: HeadFC<Queries.BlogEntryPageQuery, PageContext> = ({ data: { site, markdownRemark } }) => {
  const { siteMetadata } = site ?? { siteMetadata: { title: '' } };
  const { title = '' } = siteMetadata ?? { title: '' };

  return (
    <HeadTemplate
      title={`${markdownRemark?.frontmatter?._0?.title ?? ''} | Blog | ${title ?? ''}`}
      description={`${title ?? ''} の ${markdownRemark?.frontmatter?._1?.description ?? ''} について書かれた記事です。`}
      ogType="article"
    />
  );
};

export const EntryShowTemplate = ({
  data,
  pageContext: { published, next: rawNext, previous: rawPrevious },
}: PageProps<Queries.BlogEntryPageQuery, PageContext>): JSX.Element | null => {
  const previous = useMemo(() => createEntryAbstract(rawPrevious), [rawPrevious]);
  const next = useMemo(() => createEntryAbstract(rawNext), [rawNext]);

  const gatsbyImageData = data.thumbnailsData?.nodes?.find(({ name }) => name === published)?.childImageSharp
    ?.gatsbyImageData;

  const { markdownRemark } = data;
  if (!markdownRemark) return null;
  const { html, tableOfContents, frontmatter } = markdownRemark;
  if (!html || !published || !frontmatter) return null;
  const { _0, _1, _3 } = frontmatter;
  const { title } = _0 ?? { title: '' };
  if (title == null) return null;
  const { description } = _1 ?? { description: '' };
  if (description == null) return null;
  const { tags } = _3 ?? { tags: [] };

  return (
    <Structure
      title={title}
      published={published}
      toc={tableOfContents ?? undefined}
      thumbnail={gatsbyImageData}
      tags={tags ?? []}
      previous={previous}
      next={next}
    >
      {html}
    </Structure>
  );
};

type PrevNextProps = ComponentProps<typeof PrevNext>;

type Props = {
  title: string;
  published: string;
  children: string;
  toc?: string;
  thumbnail?: IGatsbyImageData;
  tags: readonly (string | null)[];
  previous?: PrevNextProps['previous'];
  next?: PrevNextProps['next'];
};

const Structure = ({ title, published, children: post, toc, thumbnail, tags, previous, next }: Props): JSX.Element => {
  const formattedPublished = useMemo(() => format(new Date(published), 'iiii MMM do, yyyy'), [published]);

  return (
    <div className={styles.root}>
      <article className={styles.article}>
        <header className={styles.header}>
          <time>{formattedPublished}</time>
          <ul className={styles.tags}>
            {tags.map((tag) =>
              tag ? (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ) : null,
            )}
          </ul>
          <h1 className={styles.title} data-text={title}>
            {title}
          </h1>
          {thumbnail ? <GatsbyImage className={styles.thumbnail} image={thumbnail} alt="" objectFit="contain" /> : null}
        </header>
        <Contents post={post ?? ''} />
        {previous || next ? (
          <div className={styles.bottom}>
            <PrevNext previous={previous} next={next} />
          </div>
        ) : null}
      </article>
      <Toc>{toc ?? ''}</Toc>
    </div>
  );
};

// for gatsby-node
// eslint-disable-next-line import/no-default-export
export default EntryShowTemplate;

export const query = graphql`
  query BlogEntryPage($fileAbsolutePath: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      tableOfContents
      frontmatter {
        _0 {
          title
        }
        _1 {
          description
        }
        _3 {
          tags
        }
      }
    }
    thumbnailsData: allFile(filter: { dir: { regex: "//assets/thumbnails$/" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

function createEntryAbstract(node: Readonly<PageContext['previous']>): PrevNextProps['next'] {
  const published = node?.fileAbsolutePath?.match(/(\d{4}-\d{2}-\d{2})\.md$/)?.[1];
  const title = node?.frontmatter?._0?.title;

  return published && title ? { published, title } : undefined;
}
