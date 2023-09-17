import { IUseCase } from "../../shared/protocols/IUseCase";
import { InputCreateUserDto, OutputCreateUserDto } from "../dto/CreateUserDtos";

export interface ICreateUserUseCase extends IUseCase<InputCreateUserDto, OutputCreateUserDto> {}
