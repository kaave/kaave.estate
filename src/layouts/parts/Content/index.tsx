import type { ReactNode } from 'react';
import { memo } from 'react';
import * as styles from './index.module.css';
import { Transition } from '@/components/widgets/Transition';

type Props = {
  location: Location;
  children: ReactNode;
};

export const Content = ({ location, children }: Props): JSX.Element => (
  <main id="main" className={styles.root}>
    <MemoizedTransition location={location}>{children}</MemoizedTransition>
  </main>
);

const MemoizedTransition = memo(Transition);
