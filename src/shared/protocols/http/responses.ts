import { IHttpResponse } from './IHttpResponse'

export const created = (body?: Record<string, unknown>): IHttpResponse => ({
  statusCode: 201,
  body,
})

export const ok = (body?: Record<string, unknown>): IHttpResponse => ({
  statusCode: 200,
  body,
})
