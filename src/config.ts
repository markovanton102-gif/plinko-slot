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

/** Идентификатор сайта в общей таблице comments (не смешивать отзывы разных проектов) */
export const reviewsSiteSlug = 'plinko-slot';

export const whereToPlay = [
  { name: '1win', url: 'https://1wzpdo.life/v3/1734/landing-plinko?p=p3kt' },
  { name: 'Vegas Grand', url: 'https://vgs-aff.top/r_b1s3wyA8xKoU' },
  { name: 'GetX', url: 'https://lvlx.click/tcp9hs8hg' },
] as const;

export const nav = [
  { href: '/', label: 'Главная' },
  { href: '/otzyvy/', label: 'Отзывы' },
  { href: '/kak-igrat/', label: 'Как играть' },
  { href: '/skachat/', label: 'Скачать' },
  { href: '/demo/', label: 'Демо' },
  { href: '/gde-igrat/', label: 'Где играть' },
  { href: '/analogi/', label: 'Аналоги' },
] as const;
