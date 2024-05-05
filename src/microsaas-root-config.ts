import { JwtEnconderFactory } from "./main/factories/jwt-enconder-factory";
import { CookiesFactory } from "./main/factories/cookies-factory";
import { ApplicationSessionManagerFactory } from "./main/factories/application-session-manager-factory";
import { SpaApplicationFactory } from "./main/factories/spa-application-factory";
import { applications } from "./main/applications";

const applicationManagerFactory = new ApplicationSessionManagerFactory(
  new CookiesFactory(),
  new JwtEnconderFactory()
);

const spaApplicationFactory = new SpaApplicationFactory(
  applications,
  applicationManagerFactory
);

const spaApplication = spaApplicationFactory.create();
spaApplication.run();
