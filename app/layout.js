import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/lora/500-italic.css';
import '@fontsource/mrs-saint-delafield/400.css';
import './globals.css';

import RevealObserver from '@/components/RevealObserver';
import { SITE } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.city}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: 'website', locale: 'fr_FR', siteName: SITE.name },
};

export const viewport = { themeColor: '#23392f' };

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Active les effets d'apparition seulement si JavaScript tourne : sans lui, tout reste visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
