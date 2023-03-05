import ogpBase from '../../images/ogp.png';

type Props = {
  title: string;
  /**
   * - `'website'`: WebサイトのTOPページ
   * - `'blog'`: ブログのトップページ
   * - `'article'`: 記事ページなど、WebサイトのTOP以外のページ
   * - `'product'`: 製品の紹介ページ
   */
  ogType: 'website' | 'blog' | 'article' | 'product';
  description?: string;
  ogp?: string;
  // url: string;
  /** サイトの名前。なければ `title` を利用する。 */
  siteName?: string;
};

// 謎。
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const HeadTemplate = ({ title, description, ogType, ogp = ogpBase, siteName }: Props): JSX.Element => (
  <>
    <title>{title}</title>
    <meta name="robots" content="noindex" />
    <meta property="og:title" content={title} />
    <meta property="og:type" content={ogType} />
    <meta property="og:site_name" content={siteName ?? title} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="@junkjunctions" />
    <meta name="twitter:title" content={title} />
    {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:wght@400;700&display=swap" /> */}

    {ogp ? <meta property="og:image" content={ogp} /> : null}
    {description ? (
      <>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
      </>
    ) : null}
  </>
);
