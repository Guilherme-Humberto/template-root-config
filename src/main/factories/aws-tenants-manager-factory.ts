import { AWSTenantsManager } from "../managers/aws-tenants-manager";

export class AWSTenantsManagerFactory {
  constructor(private readonly bucketName: string) {}

  create(): AWSTenantsManager {
    return new AWSTenantsManager(this.bucketName);
  }
}
