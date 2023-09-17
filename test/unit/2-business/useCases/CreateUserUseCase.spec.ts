import assert from 'node:assert'
import { describe, it } from 'node:test'

import { CreateUserUseCase } from '@business/useCases/CreateUserUseCase'
import { InputCreateUserDto } from '@domain/dto/CreateUserDtos'
import { MockedObject } from '@test/unit/mockedObject'
import { UserRepositoryMock } from '@test/unit/mocks/repositories/UserRepositoryMock'



const makeSut = () => {
  const userRepository = new UserRepositoryMock()
  const sut = new CreateUserUseCase(userRepository)
  return {
    sut,
    userRepository,
  }
}

describe('UNIT - #UseCase - CreateUser', () => {
  const params = {
    city: 'Boa viagem',
    country: 'Brazil',
    favorite_sport: 'BODYBUILDING',
    name: 'Henrique Vieira',
  } as InputCreateUserDto

  it('Should throw an error if userRepository throws', async (t) => {
    const { userRepository, sut } = makeSut()
    //Arrange
    const mockedError = new Error('OOOh noo, this is an error in prod! :((')
    t.mock.method(userRepository, 'create', () => Promise.reject(mockedError))
    //Act and Assert
    await assert.rejects(async () => sut.execute(params), mockedError)
  })

  it('should call userRepository with the correct values', async (t) => {
    const { userRepository, sut } = makeSut()
    //Arrange
    t.mock.method(userRepository, 'create', () => Promise.resolve())
    //Act
    await sut.execute(params)
    //Assert
    const calls = (userRepository.create as unknown as MockedObject).mock.calls
    assert.deepEqual(calls[0].arguments[0], {
      ...params,
    })
  })
})
