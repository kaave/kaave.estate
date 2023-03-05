// import { TransitionStatusProvider } from '@/common/contexts/TransitionStatus';
// import type { ReactNode } from 'react';
// import type { TransitionStatus } from 'react-transition-group';
// import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';
// import * as classes from './index.module.css';

type Props = {
  location: Location;
  children: JSX.Element;
};

// export const Transition = ({ children, location }: Props): JSX.Element =>
// <TransitionGroup>
//   <ReactTransition key={location.pathname} timeout={timeout}>
//     {(status: TransitionStatus) => {
//       console.log('rendered', location.pathname, status, children);
//       return (
//         <TransitionStatusProvider status={status}>
//           <div className={classes.wrapper} data-style-transition={status} style={style}>
//             {children}
//           </div>
//         </TransitionStatusProvider>
//       );
//     }}
//   </ReactTransition>
// </TransitionGroup>
//   children;

// const timeoutMs = 150;
// const style = { transitionDuration: `${timeoutMs}ms` };
// const timeout = { enter: timeoutMs, exit: timeoutMs };

// Note: 画面がチラつくためアニメーションを切る。
export const Transition = ({ children }: Props): JSX.Element => children;
