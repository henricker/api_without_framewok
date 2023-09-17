import { IUserEntity } from '../../../../src/1-domain/entities/UserEntity'
import {
  IUserRepository,
  ListUserRepositoryParams,
} from '../../../../src/2-business/repositories/IUserRepository'

export class UserRepositoryMock implements IUserRepository {
  create(_: IUserEntity): Promise<void> {
    return Promise.resolve()
  }
  list(_: ListUserRepositoryParams): Promise<IUserEntity[]> {
    return Promise.resolve([])
  }
}
