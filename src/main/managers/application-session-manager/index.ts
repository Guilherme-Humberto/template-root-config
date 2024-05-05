import { applicationCookies } from "@/main/constants/cookiesConstants";
import { CookiesProtocol } from "@/presentation/protocols/cookies";
import { EnconderProtocol } from "@/presentation/protocols/enconder";
import {
  ApplicationManagerDataType,
  SetApplicationData,
} from "@/presentation/protocols/manager";
import { navigateToUrl } from "single-spa";

export class ApplicationSessionManager implements ApplicationSessionManager {
  private tokenExpireTimeInMinutes = 240;
  private spaToken = { token: null };
  private applicationData: ApplicationManagerDataType = {
    account: null,
    token: null,
    tenantId: "",
    isLogged: false,
  };

  constructor(
    private readonly cookies: CookiesProtocol,
    private readonly encoder: EnconderProtocol
  ) {}

  validateSessionToken() {
    const sessionToken = this.getSessionToken();
    if (!sessionToken) return this.redirect();

    try {
      const data =
        this.encoder.decode<ApplicationManagerDataType>(sessionToken);

      this.setApplicationData(sessionToken, data);
      this.encodeApplicationData();
      return;
    } catch (error) {
      this.redirect();
      return;
    }
  }

  public getApplicationData() {
    return this.applicationData;
  }

  private getSessionToken() {
    return this.cookies.get<string>(applicationCookies.sessionToken);
  }

  private encodeApplicationData(): void {
    const encodePayload = {
      token: this.applicationData.token,
      id_tenant: this.applicationData.tenantId,
      account: this.applicationData.account,
    };

    this.spaToken.token = this.encoder.encode(
      encodePayload,
      this.tokenExpireTimeInMinutes
    );
  }

  private redirect() {
    window.alert("Acesso negado");
    this.clearApplicationData();
    navigateToUrl("/");
  }

  private clearApplicationData() {
    this.applicationData.token = null;
    this.applicationData.account = null;
    this.applicationData.isLogged = false;
    this.applicationData.tenantId = "";
    this.spaToken.token = null;
    this.cookies.removeAll();
  }

  private setApplicationData(token: string, data: SetApplicationData) {
    this.applicationData.token = data.token;
    this.applicationData.account = data.account;
    this.applicationData.isLogged = true;
    this.applicationData.tenantId = data.tenantId;
  }
}
