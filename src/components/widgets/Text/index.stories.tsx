import { Text } from '.';
import type { Story } from '@ladle/react';
import type { ComponentProps } from 'react';

export const Default: Story<ComponentProps<typeof Text>> = (props): JSX.Element => <Text {...props} />;

Default.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  status: 'calm',
};

Default.argTypes = {
  status: {
    control: { type: 'radio' },
    defaultValue: 'calm',
    options: ['entering', 'exiting', 'calm'],
  },
};

export const Japanese: Story<ComponentProps<typeof Text>> = (props): JSX.Element => <Text {...props} />;

Japanese.args = {
  children: `意地悪はゴーシュの息舌汁を狸を知ら肩たどし。では間もなく元気ましたって首まいまし。くたくたましたんたはございところが中の俄曲の所がはもう上手ましまして、わたしじゃむとそっくりゆうべのとおりぐんぐんをしられるんだじ。弾きすぎおまえは窓と青いたばいまの小屋の沢山汁へ弾い第二大物目のまねが弾きてしまったた。セロは前云っているた。 目は六云いホールのようをとりて行くだ。扉しか扉楽長や何へ砕けけれどもくださいう。ゴーシュは本気にまったくにはねあがっが口を間のようへ結んが風を云いてぱっとゴーシュにとってくるな。すっかりごうごうと眼が包みを聞えでた。おまえこんこんにのどで困って眼がありだう。 `,
  status: 'calm',
};

Japanese.argTypes = {
  status: {
    control: { type: 'radio' },
    defaultValue: 'calm',
    options: ['entering', 'exiting', 'calm'],
  },
};
