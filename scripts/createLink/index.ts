/* eslint-disable unicorn/prefer-module */

/**
 * @file WIP: こんな感じでルーティングはいろいろやりたいと考えている。
 * Rails みたいに定義して Flutter みたいに遷移する形が良いのではないだろうか。
 *
 * @see {@link https://guides.rubyonrails.org/routing.html} Rails
 * @see {@link https://docs.djangoproject.com/en/4.1/topics/http/urls/} Django
 * @see {@link https://docs.flutter.dev/cookbook/navigation/navigation-basics} Flutter
 */

import glob from 'glob';
import path from 'node:path';
import { camelCase } from 'change-case';
import fs from 'fs-extra';

const baseDir = path.resolve(__dirname, '..', '..', 'src', 'pages');

async function globPromise(pathName: string): Promise<string[]> {
  return new Promise((resolve, reject) =>
    glob(pathName, (error, matches) => {
      if (error) {
        reject(error);
      } else {
        resolve(matches);
      }
    }),
  );
}

async function createFileUris(baseDir: string): Promise<string[]> {
  const rawFilePaths = await globPromise(path.join(baseDir, '**', '*.tsx'));
  return rawFilePaths.map((s) =>
    s
      // Create relative uri
      .replace(baseDir, '')
      // Remove file extension
      .replace(/\.tsx$/, '')
      // Remove index
      .replace(/index/, ''),
  );
}

function createKeyName(uri: string): string {
  return (
    uri
      // Remove verbose head slash
      // Add `'Index'` to index page
      .replace(/\/$/, 'Index')
      .replace(/^\//, '')
      .split('/')
      .map((s) => `${camelCase(s)}Page`)
      .join('')
  );
}

async function createTypes(info: readonly { uri: string; name: string }[]): Promise<void> {
  const object = Object.fromEntries(info.map(({ uri, name }) => [name, uri]));

  await fs.writeFile(
    path.resolve(__dirname, '..', '..', 'src', 'Nav.tsx'),
    `
import { Link as OriginLink, navigate } from 'gatsby';
import type { ComponentProps } from 'react';
import { useCallback, forwardRef } from 'react';
import { useLocation } from '@reach/router';

type LinkProps = Omit<ComponentProps<typeof OriginLink>, 'to' | 'ref'>;

export const Routes = ${JSON.stringify(object)} as const;
export type Route = keyof typeof Routes;

export const Link = forwardRef<HTMLAnchorElement, LinkProps & { to: Route }>(({ to, ...rest }, ref): JSX.Element => {
  const location = useLocation();
  return <OriginLink
    ref={ref as any}
    to={Routes[to]}
    aria-current={location.pathname === Routes[to] ? 'page' : undefined}
    {...rest}
  />;
});

export function useNavigate(): { navigateTo: (route: Route) => void } {
  return { navigateTo: useCallback((route: Route) => navigate(Routes[route]), []) };
}
  `.trim(),
  );
}

async function main(): Promise<void> {
  const uris = await createFileUris(baseDir);
  const info = uris
    .sort()
    .reduce<{ uri: string; name: string }[]>((acc, uri) => [...acc, { uri, name: createKeyName(uri) }], []);

  await createTypes(info);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main().catch((error) => console.error(error));
