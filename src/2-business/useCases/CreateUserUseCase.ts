import { InputCreateUserDto, OutputCreateUserDto } from "../../1-domain/dto/CreateUserDtos";
import { IUseCase } from "../../shared/protocols/IUseCase";
import { IUserRepository } from "../repositories/IUserRepository";

export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    execute(input: InputCreateUserDto): Promise<void> {
        return this.userRepository.create(input)  
    }
}