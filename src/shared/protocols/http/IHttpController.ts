import { IHttpRequest } from './IHttpRequest'
import { IHttpResponse } from './IHttpResponse'

export interface IHttpController {
  execute(request: IHttpRequest): Promise<IHttpResponse>
}
