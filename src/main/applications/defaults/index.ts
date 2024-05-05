import { ApplicationProtocol } from "@/presentation/protocols/application";

export const defaults: ApplicationProtocol[] = [
  {
    id: 1,
    orgName: "@microsaas",
    projectName: "root-config",
    routeIsEqual: [],
    private: true,
    validateToken: true,
    registrationApp: true,
    urlApp: "http://localhost:8500/microsaas-root-config.js",
  },
  {
    id: 2,
    orgName: "@microsaas",
    projectName: "nomadito",
    routeIsEqual: [],
    routeStartsWith: "/nomadito",
    private: true,
    validateToken: true,
    registrationApp: true,
    urlApp: "http://localhost:8500/microsaas-nomadito.js",
  },
];
