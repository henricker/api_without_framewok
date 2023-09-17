import { IUserRepository } from "@business/repositories/IUserRepository";
import { InputListUsersDto, OutputListUsersDto } from "@domain/dto/ListUsersDtos";
import { IUseCase } from "@shared/protocols/IUseCase";


export class ListUsersUseCase
  implements IUseCase<InputListUsersDto, OutputListUsersDto>
{
  constructor(private readonly userRepository: IUserRepository) {}

  execute(input: InputListUsersDto): Promise<OutputListUsersDto> {
    return this.userRepository.list(input)
  }
}
