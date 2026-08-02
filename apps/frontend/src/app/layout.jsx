import StyledComponentsRegistry from './registry';
import AppProviders from './providers';

export const metadata = {
  title: 'MatMap — Nairobi Matatu Intelligence',
  description: 'Live fares, traffic-adjusted ETAs, and journey matching for Nairobi\'s Thika Road corridor (CBD ↔ Juja).',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MatMap',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#14140F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AppProviders>
            {children}
          </AppProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
