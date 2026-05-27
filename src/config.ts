export const site = {
  name: 'Plinko — игра в казино',
  domain: 'https://plinko-slot.space',
  lang: 'ru',
} as const;

export const affiliateUrl =
  import.meta.env.PUBLIC_AFFILIATE_URL ?? 'https://example.com/ref';

export const apkDownloadUrl =
  import.meta.env.PUBLIC_APK_DOWNLOAD_URL ??
  'https://r1wlfjc.life/application-cordova/v1/apk/com-mobile-one-win/1win.apk?p=g0bv';

export const demoGameUrl =
  import.meta.env.PUBLIC_DEMO_GAME_URL ??
  'https://launch.mix4play.com/nextapi/launch/game/demo?auth=49b334e0-6b9d-40cd-a960-1480f3df388a&game=pr_plinkoplus&project=tutu-prod&language=ru&platform=desktop&exit_url=https%3A%2F%2Fvgs-aff.top&cashier_url=https%3A%2F%2Fvgs-aff.top%2Fwlredirect%3Flink%3D%2Frefill';

export const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? '';
export const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';

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

export const footerLinks = [
  ...nav,
  { href: '/igrat-na-dengi/', label: 'Играть на деньги' },
  { href: '/popolnenie-kartoy/', label: 'Пополнение картой' },
  { href: '/popolnenie-usdt/', label: 'Пополнение USDT' },
  { href: '/popolnenie-qiwi/', label: 'Пополнение QIWI' },
] as const;

export const whereToPlay = [
  {
    name: '1win',
    url: 'https://1wzpdo.life/v3/1734/landing-plinko?p=p3kt',
    desc: 'Plinko и Plinko+ в каталоге, удобный вход с лендинга плинко.',
    icon: '🎯',
    perks: ['Plinko+ в instant-разделе', 'Мобильное приложение', 'Быстрая регистрация'],
    featured: true,
  },
  {
    name: 'Vegas Grand',
    url: 'https://vgs-aff.top/r_b1s3wyA8xKoU',
    desc: 'Казино с instant-играми и стабильным мобильным клиентом.',
    icon: '🎰',
    perks: ['Instant-игры в лобби', 'Демо у оператора', 'Вывод на карту и крипту'],
  },
  {
    name: 'GetX',
    url: 'https://lvlx.click/tcp9hs8hg',
    desc: 'Площадка с короткой регистрацией и разделом быстрых игр.',
    icon: '⚡',
    perks: ['Crash и instant', 'Игра с телефона', 'Акции для новых игроков'],
  },
] as const;
