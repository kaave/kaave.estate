import { Link } from '@/Nav';

export const NotFoundTemplate = (): JSX.Element => (
  <div>
    <h1>Page not found</h1>
    <Link to="indexPage">Go home</Link>.
  </div>
);
