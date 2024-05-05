import { verify, sign } from "jsonwebtoken";
import { EnconderProtocol } from "@/presentation/protocols/enconder";

export class JwtEnconderAdapter implements EnconderProtocol {
  constructor(private readonly secret: string) {}

  decode<T>(value: string): T {
    return verify(value, this.secret) as any;
  }

  encode(value: Record<string, unknown>, expireTimeInMinutes?: number): string {
    const hasExpireTime = typeof expireTimeInMinutes === "number";
    var expiresInParam = null;

    if (hasExpireTime) {
      expiresInParam = {
        expiresIn: expireTimeInMinutes * 60,
      };
    }
    return sign(value, this.secret, expiresInParam);
  }
}
