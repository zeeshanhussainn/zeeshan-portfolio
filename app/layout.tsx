import { ThemeProvider } from '@/components/theme-provider';
import { META_THEME_COLORS, siteConfig } from '@/config/site';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';

import { fontSans, fontMono } from '@/lib/fonts';
import { Toaster } from '@/components/ui/sonner';

import { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { SideNav } from '@/components/side-nav';
import { SiteFooter } from '@/components/site-footer';
import { docsConfig } from '@/config/docs';

// Removed server action imports since MongoDB tracking is disabled
// import { setViewsServerAction } from './actions/getAndSetViewsAction';
// import { getLoveCountServerAction } from './actions/getAndSetLoveCountServerAction';

import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'Zeeshan Hussain',
      url: 'https://zeeshan-portfolio-livid.vercel.app/',
    },
  ],
  creator: 'Zeeshan Hussain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@env_zeeshan',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// 🧩 Removed loadStats() — stats tracking not needed anymore

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            try {
              if (
                localStorage.theme === 'dark' ||
                ((!('theme' in localStorage) || localStorage.theme === 'system') &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches)
              ) {
                document
                  .querySelector('meta[name="theme-color"]')
                  .setAttribute('content', '${META_THEME_COLORS.dark}');
              }
            } catch (_) {}
          `,
          }}
        />
      </head>
      <body
        className={cn(
          'min-h-svh bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <div vaul-drawer-wrapper="">
            <div className="relative flex flex-col min-h-svh bg-background">
              <div data-wrapper="" className="flex flex-col flex-1 border-grid">
                <SiteHeader />
                <main className="flex flex-col flex-1">
                  <div className="container-wrapper">
                    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                      <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
                        <div className="h-full py-6 pr-4 overflow-auto no-scrollbar lg:py-8">
                          <SideNav config={docsConfig} />
                        </div>
                      </aside>
                      <div className="flex flex-col flex-1 py-6 pr-4 lg:py-8">
                        {children}
                      </div>
                    </div>
                  </div>
                </main>
                <SiteFooter />
              </div>
            </div>
          </div>
        </ThemeProvider>
        <Toaster richColors position="top-center" />
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
