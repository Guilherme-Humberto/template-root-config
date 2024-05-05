import { JwtEnconderAdapter } from "@/infra/adapters/jwt-enconder-adapter";

export class JwtEnconderFactory {
  create(): JwtEnconderAdapter {
    return new JwtEnconderAdapter(process.env.JWT_SECRET);
  }
}
