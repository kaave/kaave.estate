import type { HeadFC } from 'gatsby';
import { NotFoundTemplate } from '@/templates/notFound';

export const Head: HeadFC = () => <title>Not found</title>;

const NotFoundPage = (): JSX.Element => <NotFoundTemplate />;

export default NotFoundPage;
