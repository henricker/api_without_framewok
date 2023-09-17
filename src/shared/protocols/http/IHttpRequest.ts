export interface IHttpRequest {
  headers?: unknown
  query?: Record<string, unknown>
  body?: Record<string, unknown> | null
  file?: FileRequest | null
}

export type FileRequest = {
  mimeType: string
  buffer: Buffer
  filename: string
}
