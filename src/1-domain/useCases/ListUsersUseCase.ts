import { InputListUsersDto, OutputListUsersDto } from "@domain/dto/ListUsersDtos";
import { IUseCase } from "@shared/protocols/IUseCase";


export interface IListUsersUseCase
  extends IUseCase<InputListUsersDto, OutputListUsersDto> {}
