import { IUserRepository, ListUserRepositoryParams } from "@business/repositories/IUserRepository"
import { IUserEntity } from "@domain/entities/UserEntity"


export class UserRepositoryMock implements IUserRepository {
  create(_: IUserEntity): Promise<void> {
    return Promise.resolve()
  }
  list(_: ListUserRepositoryParams): Promise<IUserEntity[]> {
    return Promise.resolve([])
  }
}
