import { site } from '../config';

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.domain,
  inLanguage: 'ru-RU',
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.domain,
};

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.domain).href,
    })),
  };
}

export function mergeJsonLd(
  ...parts: (Record<string, unknown> | Record<string, unknown>[] | undefined)[]
): Record<string, unknown> | Record<string, unknown>[] {
  const flat: Record<string, unknown>[] = [];
  for (const part of parts) {
    if (part == null) continue;
    if (Array.isArray(part)) flat.push(...part);
    else flat.push(part);
  }
  if (flat.length === 0) return [];
  if (flat.length === 1) return flat[0];
  return flat;
}

export const defaultOgImage = '/images/plinko-logo.png';
