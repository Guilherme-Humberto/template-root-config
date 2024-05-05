import AWS from "aws-sdk";
import { AWSTenantProtocol } from "@/presentation/protocols/aws";

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export class AWSClientAdapter implements AWSTenantProtocol {
  private readonly S3 = new AWS.S3();
  constructor(private readonly bucketName: string) {}

  async get(key: string) {
    return await this.S3.getObject({
      Bucket: this.bucketName,
      Key: `${key}.json`,
    }).promise();
  }
}
