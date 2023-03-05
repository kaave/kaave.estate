import { HeadTemplate } from '@/templates/HeadTemplate';
import { IndexTemplate } from '@/templates/index';
import type { HeadFC } from 'gatsby';
import { graphql } from 'gatsby';

export const Head: HeadFC<Queries.IndexPageQuery> = ({ data }) => {
  const { siteMetadata } = data.site ?? { siteMetadata: { title: '' } };
  const { title = '' } = siteMetadata ?? { title: '' };

  return <HeadTemplate title={title ?? ''} ogType="article" />;
};

const IndexPage = (): JSX.Element => <IndexTemplate />;

export default IndexPage;

export const query = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;
