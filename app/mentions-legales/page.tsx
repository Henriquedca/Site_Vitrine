import type { Metadata } from 'next';
import { MentionsLegales } from '@/components/site/legal';

export const metadata: Metadata = { title: 'Mentions légales · Henrique da Costa Araújo' };

export default function Page() {
  return <MentionsLegales />;
}
