import { InputCreateUserDto } from '../../1-domain/dto/CreateUserDtos'
import { ICreateUserUseCase } from '../../1-domain/useCases/CreateUserUseCase'
import { IHttpController } from '../../shared/protocols/http/IHttpController'
import {
  FileRequest,
  IHttpRequest,
} from '../../shared/protocols/http/IHttpRequest'
import { IHttpResponse } from '../../shared/protocols/http/IHttpResponse'
import { created } from '../../shared/protocols/http/responses'
import { parseCSVtoJSON } from '../../shared/util/parseCSVtoJSON'
import { ValidationError } from '../errors/ValidationError'

export class HttpUploadCSVFileUsersController implements IHttpController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async execute(request: IHttpRequest): Promise<IHttpResponse> {
    const { file } = request
    this.validationFileCSV(file)
    const jsonArray = this.handleParseCsvToJSON(file!)
    await Promise.all(jsonArray.map(this.createUser.bind(this)))
    return created()
  }

  private createUser(data: Record<string, any>) {
    return this.createUserUseCase.execute(data as InputCreateUserDto)
  }

  private handleParseCsvToJSON(file: FileRequest) {
    return parseCSVtoJSON(file.buffer.toString('utf-8'))
  }

  private validationFileCSV(file?: FileRequest | null) {
    if (!file) {
      throw new ValidationError([{ field: 'file', error: 'file is required' }])
    }

    if (file.mimeType !== 'text/csv') {
      throw new ValidationError([
        { field: 'file', error: 'Invalid mimetype file' },
      ])
    }
  }
}
