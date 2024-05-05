import { SpaApplication } from "@/presentation/spa-application";
import { ApplicationProtocol } from "@/presentation/protocols/application";
import { ApplicationSessionManagerFactory } from "./application-session-manager-factory";

export class SpaApplicationFactory {
  constructor(
    private readonly spaApplications: ApplicationProtocol[],
    private readonly appSessionManagerFactory: ApplicationSessionManagerFactory
  ) {}

  create(): SpaApplication {
    const applicationSessionManager = this.appSessionManagerFactory.create();
    return new SpaApplication(applicationSessionManager, this.spaApplications);
  }
}
