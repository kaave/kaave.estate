import { useEffect, useMemo, useRef } from 'react';
import { useTransitionStatus } from '@/common/contexts/TransitionStatus';

type Props = {
  children: string;
};

const segmenter = new Intl.Segmenter();
const fillText = '*';

/** Status に応じてアニメーションする */
export const Text = ({ children: text }: Props): JSX.Element => {
  const status = useTransitionStatus();
  const ref = useRef<HTMLSpanElement>(null);
  const writeText = useMemo(
    () => (status === 'entering' ? [...segmenter.segment(text)].map(() => fillText).join('') : text),
    [status, text],
  );

  useEffect(() => {
    const element = ref.current;
    let clearId: number;

    if (!element) {
      return;
    }

    switch (status) {
      case 'entering': {
        // @todo
        // element.textContent = '';
        break;
      }

      case 'exiting': {
        clearId = window.setInterval(() => {
          element.textContent = replaceToFillText(element.textContent ?? '');
        }, 1000 / 10);

        break;
      }

      case 'entered':
      case 'exited':
      case 'unmounted': {
        break;
      }
    }

    return () => {
      if (clearId) {
        window.clearInterval(clearId);
      }
    };
  }, [status, text]);

  return <span ref={ref}>{writeText}</span>;
};

function replaceToFillText(source: string): string {
  return [...segmenter.segment(source)]
    .map((s) => ([' ', '　', '\n'].includes(s.segment) || Math.random() < 0.8 ? s.segment : fillText))
    .join('');
}
