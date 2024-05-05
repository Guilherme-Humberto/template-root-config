import axios, { AxiosResponse } from "axios";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols/http";

export class HttpClientAdapter implements HttpClient<any, any, any> {
  async request(data: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    const response: AxiosResponse = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers,
      params: data.queryParams,
    });

    return {
      body: response.data,
      statusCode: response.status,
    };
  }
}
