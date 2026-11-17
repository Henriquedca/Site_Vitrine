import type { Metadata } from 'next';
import { About } from '@/components/site/about';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'BTS CG, DCG, DSCG en cours, trois ans en cabinet comptable et une expérience de terrain en grande distribution et en restauration.',
};

export default function Page() {
  return <About />;
}
