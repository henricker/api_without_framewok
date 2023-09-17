import assert from 'node:assert'
import { describe, it } from 'node:test'

import { InputListUsersDto } from '../../../../src/1-domain/dto/ListUsersDtos'
import { ListUsersUseCase } from '../../../../src/2-business/useCases/ListUsersUseCase'
import { MockedObject } from '../../mockedObject'
import { UserRepositoryMock } from '../../mocks/repositories/UserRepositoryMock'

const makeSut = () => {
  const userRepository = new UserRepositoryMock()
  const sut = new ListUsersUseCase(userRepository)
  return {
    sut,
    userRepository,
  }
}

describe('UNIT - #UseCase - ListUsers', () => {
  const params = {
    q: 'match',
  } as InputListUsersDto

  const users = [
    {
      city: 'Boa viagem',
      country: 'Brazil',
      favorite_sport: 'BODYBUILDING',
      name: 'Henrique Vieira',
      id: 'id',
    },
  ]

  it('Should throw an error if userRepository throws', async (t) => {
    const { userRepository, sut } = makeSut()
    //Arrange
    const mockedError = new Error('OOOh noo, this is an error in prod! :((')
    t.mock.method(userRepository, 'list', () => Promise.reject(mockedError))
    //Act and Assert
    await assert.rejects(async () => sut.execute(params), mockedError)
  })

  it('should call userRepository with the correct values', async (t) => {
    const { userRepository, sut } = makeSut()
    //Arrange
    t.mock.method(userRepository, 'list', () => Promise.resolve([]))
    //Act
    await sut.execute(params)
    //Assert
    const calls = (userRepository.list as unknown as MockedObject).mock.calls
    assert.deepEqual(calls[0].arguments[0], {
      ...params,
    })
  })

  it('should return array of userEntities', async (t) => {
    const { userRepository, sut } = makeSut()
    //Arrange
    t.mock.method(userRepository, 'list', () => Promise.resolve(users))
    //Act
    const result = await sut.execute(params)
    //Assert
    assert.deepEqual(result, users)
  })
})
