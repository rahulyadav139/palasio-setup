import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'test-demo',
  description: 'A modern Bun-based monorepo application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
