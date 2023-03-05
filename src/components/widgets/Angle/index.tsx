import type { SVGProps } from 'react';

type Props = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'xmlns' | 'children'> & {
  color: string;
  angle: 'left' | 'right';
};

export const Angle = ({ color, angle, ...rest }: Props): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg viewBox="0 0 8 20" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path stroke={color} d={angles[angle]} />
  </svg>
);

const angles = {
  left: 'm7.41.287-7 10M.41 9.713l7 10',
  right: 'm.59 19.713 7-10M7.59 10.287l-7-10',
} as const satisfies Record<Props['angle'], string>;
