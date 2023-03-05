import { useEffect, useRef } from 'react';
import * as styles from './index.module.css';

type Props = {
  post: string;
};

export const Contents = ({ post }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (element) {
      // eslint-disable-next-line unicorn/prefer-spread
      Array.from<HTMLElement>(element.querySelectorAll(['h2', 'h3', 'h4', 'h5', 'h6'].join(','))).forEach((element) => {
        const text = element.textContent ?? '';
        element.dataset.text = text;
        element.innerHTML = `<span class="${styles.textOrigin}">${text}</span>`;
      });
    }
  }, [post]);

  return (
    // eslint-disable-next-line react/no-danger
    <div ref={ref} className={styles.root} dangerouslySetInnerHTML={{ __html: post }} />
  );
};
