import { AboutTemplate } from '@/templates/about';
import type { HeadFC } from 'gatsby';
import { HeadTemplate } from '@/templates/HeadTemplate';
import { graphql } from 'gatsby';

export const Head: HeadFC<Queries.AboutPageQuery> = ({ data }) => {
  const { siteMetadata } = data.site ?? { siteMetadata: { title: '' } };
  const { title = '' } = siteMetadata ?? { title: '' };

  return <HeadTemplate title={`About | ${title ?? ''}`} ogType="article" />;
};

const AboutPage = (): JSX.Element => <AboutTemplate />;

export default AboutPage;

export const query = graphql`
  query AboutPage {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;
