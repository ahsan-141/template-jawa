'use client';

// =============================================================
// UI — ThemeProvider (Backward Compatibility Wrapper)
// components/ui/ThemeProvider.tsx
//
// Thin wrapper yang menjaga API lama:
//   <ThemeProvider theme={themeConfig} customization={...}>
//
// Delegates ke lib/theme/ThemeProvider yang menggunakan props:
//   <ThemeProvider baseTheme={...} customization={...}>
//
// Existing code (Invitation.tsx, dev page) yang menggunakan
// prop `theme` tidak perlu diubah.
// =============================================================

import {
  ThemeProvider as InternalThemeProvider,
} from '@/lib/theme/ThemeProvider';
import type { ThemeConfig } from '@/types/theme';
import type { ThemeCustomization } from '@/types/customization';
import type { ReactNode } from 'react';

type ThemeProviderProps = {
  /** Theme config — prop name lama untuk backward compat */
  theme: ThemeConfig;
  /** Customization overrides (optional, default {}) */
  customization?: ThemeCustomization;
  children: ReactNode;
};

export function ThemeProvider({
  theme,
  customization = {},
  children,
}: ThemeProviderProps) {
  return (
    <InternalThemeProvider baseTheme={theme} customization={customization}>
      {children}
    </InternalThemeProvider>
  );
}
