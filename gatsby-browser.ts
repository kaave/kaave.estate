import type { GatsbyBrowser } from 'gatsby';

const transitionDelay = 150;

// src/layouts/index.tsx で定義されている transition 処理に合わせてスクロール処理を遅延させる
export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = ({
  routerProps: { location },
  getSavedScrollPosition,
}): boolean => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const savedPosition = getSavedScrollPosition(location);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), transitionDelay);
  }

  return false;
};
