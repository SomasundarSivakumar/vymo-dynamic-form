/**
 * Design System Tokens (JS/TS Constants)
 */

export const breakpoints = {
  mobileMax: 767,
  tabletMin: 768,
  tabletMax: 1023,
  desktopMin: 1024,
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
} as const;

export const colors = {
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  bgApp: '#090d16',
  bgCard: '#121827',
  bgInput: '#1b2438',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  error: '#f87171',
  success: '#34d399',
} as const;
