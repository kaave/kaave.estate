import '../index.css';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { Header } from './parts/Header';
import { Nav } from './parts/Nav';
import { Content } from './parts/Content';
import * as styles from './index.module.css';
import { createPortal } from 'react-dom';

type Props = {
  location: Location;
  children: ReactNode;
};

export const Layout = ({ children, location }: Props): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const handleClickMenuToggle = useCallback(() => setShowMenu((b) => !b), []);
  const handleClickMenuLink = useCallback(() => setShowMenu(false), []);

  return (
    <>
      <Header pressed={showMenu} onToggle={handleClickMenuToggle} />
      <div className={styles.pcNav}>
        <Nav />
      </div>
      <Content location={location}>{children}</Content>
      <SpNav show={showMenu} onClick={handleClickMenuLink} />
    </>
  );
};

// Note: gatsby requests default export.
export default Layout;

const SpNav = ({ show, onClick }: { show: boolean; onClick: () => void }): JSX.Element | null =>
  portalRoot
    ? createPortal(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, react/jsx-indent
        <div className={styles.spNav} aria-hidden={!show} onClick={onClick}>
          <Nav />
        </div>,
        portalRoot,
      )
    : null;

const portalRoot = typeof document === `undefined` ? null : document.querySelector('#portal');
