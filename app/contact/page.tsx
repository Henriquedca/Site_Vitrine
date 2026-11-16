import type { Metadata } from 'next';
import { Contact } from '@/components/site/contact';

export const metadata: Metadata = {
  title: 'Contact · Henrique da Costa Araújo',
  description: 'Écrire à Henrique da Costa Araújo par e-mail ou sur LinkedIn.',
};

export default function Page() {
  return <Contact />;
}
