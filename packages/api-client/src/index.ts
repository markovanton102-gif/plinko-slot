import { API_VERSION_PREFIX } from '@lawsphere/constants';

export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken?: () => Promise<string | undefined> | string | undefined;
}

/**
 * Placeholder for the typed API client. Once NestJS's OpenAPI spec exists,
 * generate this package's contents from it instead of hand-writing it.
 */
export function resolveApiUrl(config: ApiClientConfig, path: string): string {
  return `${config.baseUrl}${API_VERSION_PREFIX}${path}`;
}
