import { Link } from '@/Nav';
import * as styles from './index.module.css';

export const Nav = (): JSX.Element => (
  <nav className={styles.root}>
    <ul className={styles.list}>
      {links.map(([label, to]) => (
        <li key={label} className={styles.listItem}>
          {/* eslint-disable-next-line react/forbid-component-props */}
          <Link to={to} className={styles.link}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const links = [
  ['top', 'indexPage'],
  ['about', 'aboutPage'],
  ['blog', 'blogPage'],
  ['links', 'linksPage'],
] as const;
