export const site = {
  name: 'Plinko — игра в казино',
  domain: 'https://plinko-slot.space',
  lang: 'ru',
} as const;

export const affiliateUrl =
  import.meta.env.PUBLIC_AFFILIATE_URL ?? 'https://example.com/ref';

export const demoGameUrl =
  import.meta.env.PUBLIC_DEMO_GAME_URL ??
  'https://launch.mix4play.com/nextapi/launch/game/demo?auth=49b334e0-6b9d-40cd-a960-1480f3df388a&game=pr_plinkoplus&project=tutu-prod&language=ru&platform=desktop&exit_url=https%3A%2F%2Fvgs-aff.top&cashier_url=https%3A%2F%2Fvgs-aff.top%2Fwlredirect%3Flink%3D%2Frefill';

export const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? '';
export const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';
export const reviewsEnabled = Boolean(supabaseUrl && supabaseAnonKey);

/** Идентификатор сайта в общей таблице comments (не смешивать отзывы разных проектов) */
export const reviewsSiteSlug = 'plinko-slot';

export const nav = [
  { href: '/', label: 'Главная' },
  { href: '/otzyvy/', label: 'Отзывы' },
  { href: '/kak-igrat/', label: 'Как играть' },
  { href: '/skachat/', label: 'Скачать' },
  { href: '/demo/', label: 'Демо' },
  { href: '/gde-igrat/', label: 'Где играть' },
  { href: '/analogi/', label: 'Аналоги' },
] as const;
