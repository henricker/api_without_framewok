import { InputListUsersDto, OutputListUsersDto } from "../../../../src/1-domain/dto/ListUsersDtos";
import { IListUsersUseCase } from "../../../../src/1-domain/useCases/ListUsersUseCase";

export class ListUsersUseCaseMock implements IListUsersUseCase {
    execute(_: InputListUsersDto):  Promise<OutputListUsersDto> {
        return Promise.resolve([])
    }
}