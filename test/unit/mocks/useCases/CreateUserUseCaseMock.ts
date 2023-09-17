import { InputCreateUserDto } from "@domain/dto/CreateUserDtos";
import { ICreateUserUseCase } from "@domain/useCases/CreateUserUseCase";


export class CreateUserUseCaseMock implements ICreateUserUseCase {
  execute(_: InputCreateUserDto): Promise<void> {
    return Promise.resolve()
  }
}
