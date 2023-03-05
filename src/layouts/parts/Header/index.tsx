import { Logo } from '@/components/widgets/Logo';
import { Link } from '@/Nav';
import * as styles from './index.module.css';

type Props = {
  pressed: boolean;
  onToggle: () => void;
};

export const Header = ({ pressed, onToggle }: Props): JSX.Element => (
  <header id="header" className={styles.root}>
    <h1 className={styles.logo}>
      {/* eslint-disable-next-line react/forbid-component-props */}
      <Link to="indexPage" className={styles.link}>
        <Logo />
      </Link>
    </h1>
    <button type="button" className={styles.hamburger} aria-pressed={pressed} onClick={onToggle}>
      {pressed ? 'メニューを閉じる' : 'メニューを表示'}
      <span className={styles.lineTop} role="presentation" />
      <span className={styles.lineBottom} role="presentation" />
    </button>
  </header>
);
