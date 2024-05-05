export interface CookiesParams {
  key: string;
  value: unknown;
  expireTimeInMinutes?: number;
}

export interface CookiesFactoryProtocol {
  create(): CookiesProtocol;
}

export interface CookiesProtocol {
  get<T>(key: string): T | null;
  set(params: CookiesParams): void;
  remove(key: string): void;
  removeAll(): void;
}
