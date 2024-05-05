import { HttpStatusCode } from "axios";

export type HttpResponse<T = any> = {
  body?: T;
  statusCode: HttpStatusCode;
};
