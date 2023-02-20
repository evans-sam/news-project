import React from 'react';
import Layout from '../components/layout';
import Container from '../components/container';
import { HOME_OG_IMAGE_URL } from '../lib/constants';
import './globals.css';

export const metadata = {
  title: 'Next.js Blog Example',
  icons: [
    { type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
  ],
  shortcut: '/favicon/favicon.ico',
  apple: [{ sizes: '180x180', href: '/favicon/apple-touch-icon.png' }],
  other: [
    { rel: 'manifest', href: '/favicon/site.webmanifest' },
    { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#000000' },
  ],
  themeColor: '#000',
  description: 'A statically generated blog example using Next.js and Grit.',
  ogImage: HOME_OG_IMAGE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  );
}
