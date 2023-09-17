import { IncomingMessage, ServerResponse } from "http"

import { CreateUserUseCase } from "@business/useCases/CreateUserUseCase"
import { ListUsersUseCase } from "@business/useCases/ListUsersUseCase"
import { UserRepository } from "@infra/db/userRepository"
import { HttpListUsersController } from "@presentation/controllers/HttpListUsersController"
import { HttpUploadCSVFileUsersController } from "@presentation/controllers/HttpUploadCSVFileUsersController"

import { NativeHttpControllerAdapter } from "./NativeControllerAdapter"

export default {
  'post:/api/files': NativeHttpControllerAdapter.adapt(
    new HttpUploadCSVFileUsersController(
      new CreateUserUseCase(new UserRepository())
    )
  ),
  'get:/api/files': NativeHttpControllerAdapter.adapt(
    new HttpListUsersController(new ListUsersUseCase(new UserRepository()))
  ),
  default: (_: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 404
    response.setHeader('Content-Type', 'application/json')
    response.end(
      JSON.stringify({ message: "You're lost in the limbo!! HAHAHAHA!" })
    )
  },
}
