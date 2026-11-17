import type { Metadata } from 'next';
import { Confidentialite } from '@/components/site/legal';

export const metadata: Metadata = { title: 'Confidentialité' };

export default function Page() {
  return <Confidentialite />;
}
