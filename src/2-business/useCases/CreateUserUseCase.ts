import { IUserRepository } from "@business/repositories/IUserRepository";
import { InputCreateUserDto, OutputCreateUserDto } from "@domain/dto/CreateUserDtos";
import { IUseCase } from "@shared/protocols/IUseCase";


export class CreateUserUseCase
  implements IUseCase<InputCreateUserDto, OutputCreateUserDto>
{
  constructor(private readonly userRepository: IUserRepository) {}

  execute(input: InputCreateUserDto): Promise<void> {
    return this.userRepository.create(input)
  }
}
