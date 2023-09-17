import { IUseCase } from "../../shared/protocols/IUseCase";
import { InputListUsersDto, OutputListUsersDto } from "../dto/ListUsersDtos";

export interface IListUsersUseCase extends IUseCase<InputListUsersDto, OutputListUsersDto> {}
 