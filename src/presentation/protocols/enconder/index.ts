export interface EnconderProtocol {
  decode<T>(value: string): T;
  encode(
    value: Record<string, unknown> | string,
    expireTimeInMinutes?: number
  ): string;
}

export interface EnconderFactoryProtocol {
  create(): EnconderProtocol;
}
