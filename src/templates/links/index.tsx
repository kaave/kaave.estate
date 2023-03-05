import * as styles from './index.module.css';

export const LinksTemplate = (): JSX.Element => (
  <article className={styles.root}>
    <h2 className={styles.heading}>Links</h2>
    <ul className={styles.list}>
      {links.map(({ title, url, description }) => (
        <li key={url}>
          <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">
            <span className={styles.title}>{title}:</span>
            <span className={styles.description}>{description ?? url}</span>
          </a>
        </li>
      ))}
    </ul>
  </article>
);

const links: ReadonlyArray<{
  title: string;
  url: string;
  description?: string;
}> = [
  {
    title: 'Twitter',
    url: 'https://twitter.com/junkjunctions',
    description: '@junkjunctions',
  },
  {
    title: 'Mastodon',
    url: 'https://mstdn.jp/web/@kaave',
    description: '@kaave@mstdn.jp',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/kaave',
    description: '@kaave',
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/kyousuke-abe-b44733172/',
    description: 'Kyousuke Abe',
  },
];
