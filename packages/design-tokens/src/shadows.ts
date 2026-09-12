export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(17, 24, 39, 0.06)',
  md: '0 4px 8px rgba(17, 24, 39, 0.08)',
  lg: '0 10px 24px rgba(17, 24, 39, 0.12)',
  xl: '0 20px 40px rgba(17, 24, 39, 0.16)',
} as const;

export type ShadowToken = typeof shadows;
