import contents from './index.md';
import * as styles from './index.module.css';

export const IndexTemplate = (): JSX.Element => (
  <article className={styles.root}>
    {/* eslint-disable-next-line react/no-danger */}
    <div className={styles.contents} dangerouslySetInnerHTML={{ __html: contents }} />
  </article>
);
