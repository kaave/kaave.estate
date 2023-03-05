import * as styles from './index.module.css';
import contents from './index.md';

export const AboutTemplate = (): JSX.Element => (
  <article className={styles.root}>
    <h2 className={styles.heading}>About</h2>
    {/* eslint-disable-next-line react/no-danger */}
    <div className={styles.contents} dangerouslySetInnerHTML={{ __html: contents }} />
  </article>
);
