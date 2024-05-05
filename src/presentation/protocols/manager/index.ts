import { LoginUserModel } from "@/domain/models/user";

export type SetApplicationData = {
  token: string;
  account: LoginUserModel;
  tenantId: string;
};

export type ApplicationManagerDataType = {
  token: string;
  account: LoginUserModel;
  isLogged: boolean;
  tenantId: string;
};

export interface ApplicationSessionManager {
  validateToken(): void;
  setApplicationData(data: SetApplicationData): void;
}
