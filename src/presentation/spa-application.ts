import { registerApplication, start } from "single-spa";
import { ApplicationProtocol } from "./protocols/application";
import { ApplicationSessionManager } from "@/main/managers/application-session-manager";

export class SpaApplication {
  constructor(
    private applicationManager: ApplicationSessionManager,
    private applications: ApplicationProtocol[]
  ) {}

  async run(): Promise<void> {
    const session = this.applicationManager.getApplicationData();

    this.applications.forEach((app) => {
      if (!app.registrationApp) return;

      const appName = this.getApplicationName(app.orgName, app.projectName);

      registerApplication({
        name: appName,
        app: () => System.import(appName) as any,
        activeWhen: (location) => this.activeApplicationWhen(location, app),
        customProps: { session, application: {} },
      });
    });
    start({ urlRerouteOnly: true });
  }

  private activeApplicationWhen(location: Location, app: ApplicationProtocol) {
    const hasRouteStartsWith = !!app.routeStartsWith;

    if (hasRouteStartsWith) {
      return location.pathname.startsWith(app.routeStartsWith);
    }

    if (app.routeIsEqual.length) {
      const isValidRoute = app.routeIsEqual.some(
        (route) => route === location.pathname
      );

      return isValidRoute;
    }

    return false;
  }

  private getApplicationName(orgName: string, projectName: string) {
    return `${orgName}/${projectName}`;
  }
}
