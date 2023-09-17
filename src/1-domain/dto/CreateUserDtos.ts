import { IUserEntity } from '../../1-domain/entities/UserEntity'

export type InputCreateUserDto = Omit<IUserEntity, 'id'>
export type OutputCreateUserDto = void
