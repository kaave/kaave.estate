import { HeadTemplate } from '@/templates/HeadTemplate';
import { LinksTemplate } from '@/templates/links';
import type { HeadFC } from 'gatsby';
import { graphql } from 'gatsby';

export const Head: HeadFC<Queries.LinksPageQuery> = ({ data }) => {
  const { siteMetadata } = data.site ?? { siteMetadata: { title: '' } };
  const { title = '' } = siteMetadata ?? { title: '' };

  return <HeadTemplate title={`Links | ${title ?? ''}`} ogType="article" />;
};

const LinksPage = (): JSX.Element => <LinksTemplate />;

export default LinksPage;

export const query = graphql`
  query LinksPage {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;
