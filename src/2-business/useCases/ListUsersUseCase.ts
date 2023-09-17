import {
  InputListUsersDto,
  OutputListUsersDto,
} from '../../1-domain/dto/ListUsersDtos'
import { IUseCase } from '../../shared/protocols/IUseCase'
import { IUserRepository } from '../repositories/IUserRepository'

export class ListUsersUseCase
  implements IUseCase<InputListUsersDto, OutputListUsersDto>
{
  constructor(private readonly userRepository: IUserRepository) {}

  execute(input: InputListUsersDto): Promise<OutputListUsersDto> {
    return this.userRepository.list(input)
  }
}
