/* eslint-disable no-shadow, react/no-array-index-key, react/jsx-props-no-spreading */
import { useState, useMemo, useEffect } from 'react';
import type { HTMLAttributes } from 'react';

type Props = {
  children: string;
  intervalMSec?: number;
  confuseCount?: number;
  callback?: () => void;
} & HTMLAttributes<HTMLSpanElement>;

export const Char = ({ children: c, intervalMSec = 200, confuseCount = 3, callback, ...rest }: Props): JSX.Element => {
  const [remainingCount, setRemainingCount] = useState(confuseCount);
  const confusedCharList = useMemo(() => {
    const bits = new TextEncoder().encode(c);
    const [tail, ...rest] = bits.reverse();
    const reverseRest = rest.reverse();

    return [...Array.from({ length: confuseCount }).keys()]
      .map((i) => new TextDecoder().decode(new Uint8Array([...reverseRest, (tail - (i + 1) * 2) % 256])))
      .reverse();
  }, [c, confuseCount]);

  useEffect(() => {
    let id: number | undefined;
    const fn = (i: number): void => {
      const next = i - 1;
      id = window.setTimeout(() => {
        setRemainingCount(next);
        id = undefined;
        next > 0 ? fn(next) : callback?.();
      }, intervalMSec);
    };

    if (remainingCount > 0) fn(remainingCount);

    return () => {
      if (id) window.clearTimeout(id);
    };
  }, [intervalMSec, remainingCount, callback]);

  return (
    <span className="ConfusedChar" {...rest}>
      <span className="ConfusedChar__list" role="presentation">
        {confusedCharList.map((confusedC, i) => (
          <span
            key={`${confusedC} ${i}`}
            className="ConfusedChar__char"
            style={{ ...(remainingCount !== i + 1 && { visibility: 'hidden' }) }}
          >
            {confusedC}
          </span>
        ))}
      </span>
      <span className="ConfusedChar__origin" style={{ ...(remainingCount === 0 && { visibility: 'hidden' }) }}>
        {c}
      </span>
    </span>
  );
};
