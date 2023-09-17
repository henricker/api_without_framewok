import { IncomingMessage, ServerResponse } from "http";
import { CreateUserUseCase } from "../../../2-business/useCases/CreateUserUseCase";
import { HttpUploadCSVFileUsersController } from "../../../3-presentation/controllers/HttpUploadCSVFileUsersController";
import { UserRepository } from "../../db/userRepository";
import { NativeHttpControllerAdapter } from "./NativeControllerAdapter";
import { HttpListUsersController } from "../../../3-presentation/controllers/HttpListUsersController";
import { ListUsersUseCase } from "../../../2-business/useCases/ListUsersUseCase";

export default {
    'post:/api/files': NativeHttpControllerAdapter.adapt(new HttpUploadCSVFileUsersController(new CreateUserUseCase(new UserRepository()))),
    'get:/api/files': NativeHttpControllerAdapter.adapt(new HttpListUsersController(new ListUsersUseCase(new UserRepository()))),
    'default': (_: IncomingMessage, response: ServerResponse) => {
        response.statusCode = 404
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify({ message: 'You\'re lost in the limbo!! HAHAHAHA!' }))
    }
}