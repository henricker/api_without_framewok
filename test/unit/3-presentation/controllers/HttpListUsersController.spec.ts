import { describe, it } from "node:test";
import assert from "node:assert";
import { MockedObject } from "../../mockedObject";
import { HttpListUsersController } from "../../../../src/3-presentation/controllers/HttpListUsersController";
import { ListUsersUseCaseMock } from "../../mocks/useCases/ListUsersUseCaseMock";
import { IHttpRequest } from "../../../../src/shared/protocols/http/IHttpRequest";


const makeSut = () => {
    const listUsersUseCase = new ListUsersUseCaseMock()
    const sut = new HttpListUsersController(listUsersUseCase)
    return {
        sut,
        listUsersUseCase
    }
}

describe('UNIT - #HttpController - ListUsers', () => {
    const params = {
        query: {
            q: 'search'
        }
    } as IHttpRequest

    const users = [{
        city: 'Boa viagem',
        country: 'Brazil',
        favorite_sport: 'BODYBUILDING',
        name: 'Henrique Vieira',
        id: 'id'
    }]

    it('Should throw an error if listUsersUseCase throws', async (t) => {
        const { listUsersUseCase, sut } = makeSut()
        //Arrange
        const mockedError = new Error('OOOh noo, this is an error in prod! :((')
        t.mock.method(listUsersUseCase, 'execute', () => Promise.reject(mockedError))
        //Act and Assert
        await assert.rejects(async () => sut.execute(params), mockedError)
    })

    it('should call listUsersUseCase with the correct values', async (t) => {
        const { listUsersUseCase, sut } = makeSut()
        //Arrange
        t.mock.method(listUsersUseCase, 'execute', () => Promise.resolve([]))
        //Act
        await sut.execute(params)
        //Assert
        const calls = (listUsersUseCase.execute as unknown as MockedObject).mock.calls
        assert.deepEqual(calls[0].arguments[0], {
            search: params.query?.q
        })
    })

    it('Should return 200 and user entities on success', async (t) => {
        const { listUsersUseCase, sut } = makeSut()
        //Arrange
        t.mock.method(listUsersUseCase, 'execute', () => Promise.resolve(users))
        //Act
        const response = await sut.execute(params)
        //Assert
        assert.equal(response.statusCode, 200)
        assert.deepEqual(response.body, { users })
    })
})