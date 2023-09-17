import { IUserEntity } from '../../1-domain/entities/UserEntity'

export type InputListUsersDto = {
  search?: string
}
export type OutputListUsersDto = IUserEntity[]
