import { useEffect, useRef } from 'react';
import * as styles from './index.module.css';
import BezierEasing from 'bezier-easing';
import { range } from '@/common/utils/range';

type Props = {
  children: string;
};

export const Toc = ({ children: toc }: Props): JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const elements = ref.current?.querySelectorAll('a');
    if (!elements) return;

    elements.forEach((element) => element.addEventListener('click', handleAnchorClick));

    return () => elements.forEach((element) => element.removeEventListener('click', handleAnchorClick));
  }, [toc]);

  return (
    // eslint-disable-next-line react/no-danger
    <aside ref={ref} className={styles.root} dangerouslySetInnerHTML={{ __html: toc ?? '' }} />
  );
};

function handleAnchorClick(event: MouseEvent): void {
  if (!event.currentTarget) {
    return;
  }

  const target = event.currentTarget as HTMLAnchorElement;
  const query = `[data-text="${target.textContent ?? ''}"]`;
  const moveTo = document.querySelector(query);

  if (moveTo) {
    scrollTo(moveTo as HTMLElement, 100, 30);
  }
}

const easing = BezierEasing(0.77, 0, 0.175, 1); /* http://easings.net/ja#easeInOutQuart */
const scrollTo = (targetElement: HTMLElement, scrollMSec = 200, offsetY = 0): void => {
  const animationFrames = range(Math.round(scrollMSec / (1000 / 60)));
  const currentTop = window.scrollY;
  const targetTop = targetElement.getBoundingClientRect().top - offsetY; // targetElement.getBoundingClientRect().top が移動する必要のある量
  const movingPositions =
    animationFrames.length > 0 ? animationFrames.map((i) => easing(i / animationFrames.length) * targetTop) : [0];

  let rafId: number | null = null;

  function scroll(): void {
    const position = movingPositions.shift();
    if (position === undefined) {
      stopScroll();
      return;
    }

    window.scrollTo(0, currentTop + position);
    rafId = window.requestAnimationFrame(scroll);
  }

  function stopScroll(): void {
    if (rafId === null) return;
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  rafId = window.requestAnimationFrame(scroll);
};
