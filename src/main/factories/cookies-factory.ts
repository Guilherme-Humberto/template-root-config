import { CookiesAdapter } from "@/infra/adapters/cookies-adapter";
import { applicationCookies } from "@/main/constants/cookiesConstants";
import {
  CookiesFactoryProtocol,
  CookiesProtocol,
} from "@/presentation/protocols/cookies";

export class CookiesFactory implements CookiesFactoryProtocol {
  create(): CookiesProtocol {
    return new CookiesAdapter(applicationCookies);
  }
}
