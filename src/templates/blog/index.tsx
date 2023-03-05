/* eslint-disable react/forbid-component-props */
/**
 * @file `blog#index` page template
 */

import type { HeadFC } from 'gatsby';
import { Link } from 'gatsby';
import { useMemo } from 'react';
import { DateTime } from '@/components/widgets/DateTime';
import { format } from 'date-fns';
import * as styles from './index.module.css';

export const Head: HeadFC = () => <title>Entry index.</title>;

type Entry = {
  title: string;
  published: Date;
};

type Props = {
  entries: Record<number /* year */, readonly Entry[]>;
};

export const BlogTemplate = ({ entries }: Props): JSX.Element => {
  const normalizedEntries = useMemo(
    () =>
      Object.entries(entries)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, entriesInThisYear]) => ({
          year,
          entries: entriesInThisYear.map(({ published, ...rest }) => ({
            ...rest,
            key: published.toISOString(),
            to: `/blog/${format(published, 'yyyy-MM-dd')}`,
            published,
          })),
        })),
    [entries],
  );

  return (
    <article className={styles.root}>
      <h2 className={styles.heading}>Blog</h2>
      <section className={styles.entries}>
        {normalizedEntries.map(({ year, entries }) => (
          <div key={year} className={styles.entry}>
            <h3 className={styles.year}>{year}</h3>
            <ol className={styles.list}>
              {entries.map(({ key, title, to, published }) => (
                <li key={key} className={styles.listItem}>
                  <Link to={to} className={styles.link}>
                    <DateTime className={styles.datetime} format="MMM do">
                      {published}
                    </DateTime>
                    {title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </article>
  );
};
