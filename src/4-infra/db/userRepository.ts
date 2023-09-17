import { randomUUID } from 'node:crypto'

import { IUserEntity } from '../../1-domain/entities/UserEntity'
import {
  IUserRepository,
  ListUserRepositoryParams,
} from '../../2-business/repositories/IUserRepository'
import database from './database'

export class UserRepository implements IUserRepository {
  private data: IUserEntity[] = database

  create(props: IUserEntity): Promise<void> {
    this.data.push({ ...props, id: randomUUID() })
    return Promise.resolve()
  }

  list(props: ListUserRepositoryParams): Promise<IUserEntity[]> {
    if (props.search) {
      const searchTerm = props.search.toLowerCase()
      return Promise.resolve(
        this.data.filter((user) =>
          Object.values(user).some((value) =>
            value.toLowerCase().includes(searchTerm)
          )
        )
      )
    } else {
      return Promise.resolve(this.data)
    }
  }
}
