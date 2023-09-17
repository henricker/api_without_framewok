import { IUserEntity } from "@domain/entities/UserEntity"


export type InputCreateUserDto = Omit<IUserEntity, 'id'>
export type OutputCreateUserDto = void
