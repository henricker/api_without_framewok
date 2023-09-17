import { IncomingMessage, ServerResponse } from 'http'

import { IHttpController } from '@shared/protocols/http/IHttpController'
import { FileRequest, IHttpRequest } from '@shared/protocols/http/IHttpRequest'
import { IsValidJSONString } from '@shared/util/IsValidJsonstring'

export class NativeHttpControllerAdapter {
  static adapt(controller: IHttpController) {
    return async (request: IncomingMessage, response: ServerResponse) => {
      try {
        let body = null
        const bufferFromRequest = await this.getBufferFromRequest(request)
        const file = this.extractFileFromBuffer(bufferFromRequest)

        const bufferString = bufferFromRequest.toString().trim()
        if (!file && IsValidJSONString(bufferString)) {
          body = JSON.parse(bufferFromRequest.toString('utf-8').trim() ?? '{}')
        }

        const httpRequest: IHttpRequest = {
          headers: request.headers,
          query: this.query(request),
          file,
          body,
        }

        const httpResponse = await controller.execute(httpRequest)

        response.statusCode = httpResponse.statusCode
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(httpResponse.body))
      } catch (err: any) {
        this.responseErrorHandling(err, response)
      }
    }
  }

  static extractFileFromBuffer(buffer: Buffer): FileRequest | null {
    const content = buffer.toString()
    // Define regular expressions to match Content-Disposition and Content-Type headers
    const contentDispositionRegex =
      /Content-Disposition: form-data; name="file"; filename="([^"]+)"/
    const contentTypeRegex = /Content-Type: (.+)/

    // Extract filename and content type
    const filenameMatch = new RegExp(contentDispositionRegex).exec(content)
    const mimeTypeMatch = new RegExp(contentTypeRegex).exec(content)

    if (!filenameMatch || !mimeTypeMatch) {
      return null
    }

    const filename = filenameMatch[1]
    const mimeType = mimeTypeMatch[1]

    // Extract the file content
    const fileContent = content.split('\n').slice(4, -2).join('\n')
    const fileBuffer = Buffer.from(fileContent)

    return { buffer: fileBuffer, mimeType, filename }
  }

  static query(req: IncomingMessage) {
    const query = req.url?.split('?') as string[]
    const result = {} as any

    if (query?.length >= 2) {
      query[1].split('&').forEach((item) => {
        try {
          result[item.split('=')[0]] = item.split('=')[1]
        } catch (err) {
          result[item.split('=')[0]] = ''
        }
      })
    }
    return result
  }

  static getBufferFromRequest(request: IncomingMessage): Promise<Buffer> {
    return new Promise((resolve) => {
      const chunks: any[] = []
      request.on('data', (chunk) => chunks.push(chunk))
      request.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })
  }

  static responseErrorHandling(
    error: Error & { statusCode: number; details: any },
    response: ServerResponse
  ) {
    response.statusCode = error.statusCode || 500
    const message =
      response.statusCode !== 500 ? error.message : 'Internal Server Error'
    return response.end(
      JSON.stringify({
        message,
        details: response.statusCode === 422 ? error.details : undefined,
      })
    )
  }
}
