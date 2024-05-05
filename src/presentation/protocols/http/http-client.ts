import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

export interface HttpClient<T, H, R> {
  request: (data: HttpRequest<T, H>) => Promise<HttpResponse<R>>;
}
