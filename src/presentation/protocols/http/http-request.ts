import { Method } from "axios";

export type HttpRequest<T, H> = {
  url: string;
  method: Method;
  body?: T;
  headers?: H;
  queryParams?: {};
};
