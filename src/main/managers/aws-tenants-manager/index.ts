import { AWSClientAdapter } from "@/infra/adapters/aws-client-adapter";

export class AWSTenantsManager {
  private readonly bucketData = {};
  constructor(private readonly bucketName: string) {}

  public async get(fileKey: string, tenantId: string) {
    const bucket = new AWSClientAdapter(this.bucketName);
    const result = await bucket.get(`tenant_${tenantId}/${fileKey}`);
    this.bucketData[fileKey] = JSON.parse(result.Body.toString());
  }

  public getBucketData() {
    return this.bucketData;
  }
}
