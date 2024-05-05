import Cookies from "universal-cookie";
import {
  CookiesParams,
  CookiesProtocol,
} from "@/presentation/protocols/cookies";

export class CookiesAdapter implements CookiesProtocol {
  private cookiesClient = new Cookies();
  private domain: string = window.location.hostname
    .split(".")
    .slice(1, 4)
    .join(".");

  constructor(private readonly applicationCookies: { [key: string]: string }) {}

  remove(key: string): void {
    const options = {
      path: "/",
      domain: this.domain,
      sameSite: true,
    };
    this.cookiesClient.remove(key, options);
  }

  get<T>(key: string): T | null {
    return this.cookiesClient.get(key) ?? null;
  }

  set(params: CookiesParams): void {
    const options = {
      path: "/",
      domain: this.domain,
      sameSite: true,
    };
    if (params.expireTimeInMinutes) {
      Object.assign(options, {
        expires: this.getExpireDate(params.expireTimeInMinutes),
      });
    }
  }

  removeAll(): void {
    const cookies = Object.values(this.applicationCookies);
    cookies.forEach((cookie) => this.remove(cookie));
  }

  private getExpireDate(minutes: number): Date {
    const date = new Date();
    const currentTime = date.getTime();
    const expireTime = currentTime + 1000 * (minutes * 60);
    date.setTime(expireTime);
    return date;
  }
}
