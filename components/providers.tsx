'use client';

import { SessionProvider as CustomSessionProvider } from '@/lib/contexts/session-context';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevent rendering UI until theme is known
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
      <CustomSessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </CustomSessionProvider>
  );
}
