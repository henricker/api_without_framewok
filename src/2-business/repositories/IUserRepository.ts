import { IUserEntity } from '../../1-domain/entities/UserEntity'

export type ListUserRepositoryParams = {
  search?: string
}

export interface IUserRepository {
  create(props: IUserEntity): Promise<void>
  list(props: ListUserRepositoryParams): Promise<IUserEntity[]>
}
