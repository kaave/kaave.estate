import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

const TransitionStatusContext = createContext<TransitionStatus>('unmounted');

export const TransitionStatusProvider = ({
  status,
  children,
}: {
  status: TransitionStatus;
  children: ReactNode;
}): JSX.Element => <TransitionStatusContext.Provider value={status}>{children}</TransitionStatusContext.Provider>;

export function useTransitionStatus(): TransitionStatus {
  const status = useContext(TransitionStatusContext);
  if (!status) throw new Error('Not set status');

  return status;
}
