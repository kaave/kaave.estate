/* eslint-disable react/forbid-component-props */
import { Angle } from '@/components/widgets/Angle';
import { DateTime } from '@/components/widgets/DateTime';
import { Link } from 'gatsby';
import * as styles from './index.module.css';

type EntryAbstract = {
  /** format: YYYY-MM-DD */
  published: string;
  /** entry's title. */
  title: string;
};

type Props = {
  previous?: EntryAbstract;
  next?: EntryAbstract;
};

export const PrevNext = ({ previous, next }: Props): JSX.Element => (
  <div className={styles.root}>
    {previous ? (
      <Link className={styles.left} to={`/blog/${previous.published}`}>
        <Angle className={styles.icon} angle="left" color="currentColor" width="1em" />
        <DateTime className={styles.time} format="iiii MMM do, yyyy">
          {new Date(previous.published)}
        </DateTime>
        <span className={styles.title}>{previous.title}</span>
      </Link>
    ) : null}
    {next ? (
      <Link className={styles.right} to={`/blog/${next.published}`}>
        <DateTime className={styles.time} format="iiii MMM do, yyyy">
          {new Date(next.published)}
        </DateTime>
        <Angle className={styles.icon} angle="right" color="currentColor" width="1em" />
        <span className={styles.title}>{next.title}</span>
      </Link>
    ) : null}
  </div>
);
