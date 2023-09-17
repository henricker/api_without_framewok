import { IUserEntity } from "@domain/entities/UserEntity"


export type InputListUsersDto = {
  search?: string
}
export type OutputListUsersDto = IUserEntity[]
