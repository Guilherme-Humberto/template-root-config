export interface AWSTenantProtocol {
  get(keyFile: string, tenantId: string);
}

export interface AWSTenantFactoryProtocol {
  create(): AWSTenantProtocol;
}
