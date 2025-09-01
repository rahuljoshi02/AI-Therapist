'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider as CustomSessionProvider} from '@/lib/contexts/session-context';

export function Providers({ children }: { children: React.ReactNode }) {
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
  )
}
