export interface ApplicationProtocol {
  id: number;
  orgName: string;
  projectName: string;
  routeIsEqual: string[];
  private: boolean;
  validateToken: boolean;
  registrationApp: boolean;
  routeStartsWith?: string;
  urlApp: string;
}
