export const colors = {
  brand: {
    50: '#eef4ff',
    100: '#d9e6ff',
    200: '#b3ccff',
    300: '#8caeff',
    400: '#5c85f5',
    500: '#3661d6',
    600: '#2848ab',
    700: '#1e3682',
    800: '#162759',
    900: '#0d1733',
  },
  neutral: {
    0: '#ffffff',
    50: '#f7f8fa',
    100: '#eceef2',
    200: '#d8dce3',
    300: '#b7bec9',
    400: '#8e97a6',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    1000: '#000000',
  },
  success: '#1a8f4c',
  warning: '#b5760b',
  danger: '#c2372a',
  info: '#2563eb',
} as const;

export type ColorToken = typeof colors;
