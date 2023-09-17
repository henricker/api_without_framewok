import { InputCreateUserDto } from '../../../../src/1-domain/dto/CreateUserDtos'
import { ICreateUserUseCase } from '../../../../src/1-domain/useCases/CreateUserUseCase'

export class CreateUserUseCaseMock implements ICreateUserUseCase {
  execute(_: InputCreateUserDto): Promise<void> {
    return Promise.resolve()
  }
}
