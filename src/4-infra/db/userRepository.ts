import { randomUUID } from "crypto"

import { IUserRepository, ListUserRepositoryParams } from "@business/repositories/IUserRepository"
import { IUserEntity } from "@domain/entities/UserEntity"

import database from "./database"



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
