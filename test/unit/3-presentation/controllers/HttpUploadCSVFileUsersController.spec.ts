import assert from 'node:assert'
import { describe, it } from 'node:test'

import { HttpUploadCSVFileUsersController } from '@presentation/controllers/HttpUploadCSVFileUsersController'
import { ValidationError } from '@presentation/errors/ValidationError'
import { IHttpRequest } from '@shared/protocols/http/IHttpRequest'
import { MockedObject } from '@test/unit/mockedObject'
import { CreateUserUseCaseMock } from '@test/unit/mocks/useCases/CreateUserUseCaseMock'



const makeSut = () => {
  const createUserUseCase = new CreateUserUseCaseMock()
  const sut = new HttpUploadCSVFileUsersController(createUserUseCase)
  return {
    sut,
    createUserUseCase,
  }
}

describe('UNIT - #HttpController - UploadCSVFileUsers', () => {
  const validParams = {
    file: {
      buffer: Buffer.from(
        'name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\nJane Smith,London,UK,Football'
      ),
      mimeType: 'text/csv',
      filename: 'file.csv',
    },
  } as IHttpRequest

  const invalidParamsWithoutFile = {} as IHttpRequest

  const invalidParamsWithoutInvalidMimeType = {
    file: {
      buffer: Buffer.from(
        'name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\nJane Smith,London,UK,Football',
        'utf-8'
      ),
      mimeType: 'text/txt',
      filename: 'file.txt',
    },
  } as IHttpRequest

  it('Should throw ValidationError if file not found', async () => {
    const { sut } = makeSut()
    //Act & Assert
    await assert.rejects(
      sut.execute(invalidParamsWithoutFile),
      new ValidationError([{ field: 'file', error: 'file is required' }])
    )
  })

  it('Should throw ValidationError if mimeType of file is not text/csv', async () => {
    const { sut } = makeSut()
    //Act & Assert
    await assert.rejects(
      sut.execute(invalidParamsWithoutInvalidMimeType),
      new ValidationError([{ field: 'file', error: 'Invalid mimetype file' }])
    )
  })

  it('should call createUserUseCase twice after parsing CSV with two users', async (t) => {
    const { sut, createUserUseCase } = makeSut()
    //Arrange
    t.mock.method(createUserUseCase, 'execute', () => Promise.resolve())
    //Act
    await sut.execute(validParams)
    //Assert
    const calls = (createUserUseCase.execute as unknown as MockedObject).mock
      .calls
    assert.deepEqual(calls[0].arguments[0], {
      city: 'New York',
      country: 'USA',
      favorite_sport: 'Basketball',
      name: 'John Doe',
    })
    assert.deepEqual(calls[1].arguments[0], {
      city: 'London',
      country: 'UK',
      favorite_sport: 'Football',
      name: 'Jane Smith',
    })
  })
  it('Should return 201 on success with empty body', async (t) => {
    const { sut, createUserUseCase } = makeSut()
    //Arrange
    t.mock.method(createUserUseCase, 'execute', () => Promise.resolve())
    //Act
    const result = await sut.execute(validParams)
    //Assert
    assert.equal(result.statusCode, 201)
    assert.equal(result.body, null)
  })
})
