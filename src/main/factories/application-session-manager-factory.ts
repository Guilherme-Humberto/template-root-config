import { CookiesFactoryProtocol } from "@/presentation/protocols/cookies";
import { ApplicationSessionManager } from "../managers/application-session-manager";
import { EnconderFactoryProtocol } from "@/presentation/protocols/enconder";

export class ApplicationSessionManagerFactory {
  constructor(
    private readonly cookiesFactory: CookiesFactoryProtocol,
    private readonly enconderFactory: EnconderFactoryProtocol
  ) {}

  create(): ApplicationSessionManager {
    const cookies = this.cookiesFactory.create();
    const encoder = this.enconderFactory.create();
    return new ApplicationSessionManager(cookies, encoder);
  }
}
