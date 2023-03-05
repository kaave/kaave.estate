import type { HTMLProps } from 'react';
import { useMemo } from 'react';
import { format } from 'date-fns';

type Props = {
  children: Date;
  format?: string;
} & Omit<HTMLProps<HTMLTimeElement>, 'children' | 'dateTime'>;

export const DateTime = ({ children: date, format: outputFormat = 'MM d', ...rest }: Props): JSX.Element => {
  const formattedDateTime = useMemo(
    () => ({ presentation: format(date, outputFormat), machineReadable: date.toISOString() }),
    [date, outputFormat],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <time dateTime={formattedDateTime.machineReadable} {...rest}>
      {formattedDateTime.presentation}
    </time>
  );
};
