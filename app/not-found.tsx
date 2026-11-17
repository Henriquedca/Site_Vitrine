import type { Metadata } from 'next';
import { NotFoundView } from '@/components/site/not-found-view';

export const metadata: Metadata = { title: { absolute: 'Page introuvable - Henrique da Costa Araújo' } };

export default function NotFound() {
  return <NotFoundView />;
}
