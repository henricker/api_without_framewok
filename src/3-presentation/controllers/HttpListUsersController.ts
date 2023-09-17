import { IListUsersUseCase } from "../../1-domain/useCases/ListUsersUseCase";
import { IHttpController } from "../../shared/protocols/http/IHttpController";
import { IHttpRequest } from "../../shared/protocols/http/IHttpRequest";
import { IHttpResponse } from "../../shared/protocols/http/IHttpResponse";
import { ok } from "../../shared/protocols/http/responses";


export class HttpListUsersController implements IHttpController {
    constructor(
        private readonly listUsersUseCase: IListUsersUseCase
    ) {}
    
    async execute(request: IHttpRequest): Promise<IHttpResponse> {
        const result = await this.listUsersUseCase.execute({
            search: request.query?.q as string
        })

        return ok({ users: result })
    }
}