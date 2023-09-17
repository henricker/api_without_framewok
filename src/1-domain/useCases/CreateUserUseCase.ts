import { InputCreateUserDto, OutputCreateUserDto } from "@domain/dto/CreateUserDtos";
import { IUseCase } from "@shared/protocols/IUseCase";


export interface ICreateUserUseCase
  extends IUseCase<InputCreateUserDto, OutputCreateUserDto> {}
