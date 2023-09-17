import assert from 'node:assert'
import { IncomingMessage, Server, ServerResponse } from 'node:http'
import { after, afterEach, before, describe, it } from 'node:test'

import database from '@infra/db/database'

import { BASE_URL } from '../util/BaseUrl'
import { cleanDatabase } from '../util/cleanDatabase'


const validCsvFile = `
--X-INSOMNIA-BOUNDARY
Content-Disposition: form-data; name="file"; filename="users-csv.csv"
Content-Type: text/csv

name,city,country,favorite_sport
John Doe,New York,USA,Basketball
Jane Smith,London,UK,Football
Mike Johnson,Paris,France,Tennis
Karen Lee,Tokyo,Japan,Swimming
Tom Brown,Sydney,Australia,Running
Emma Wilson,Berlin,Germany,Basketball
--X-INSOMNIA-BOUNDARY--
`

const invalidFileBuffer = `
--X-INSOMNIA-BOUNDARY
Content-Disposition: form-data; name="file"; filename="users-csv.txt"
Content-Type: text/txt

this is a text file!
--X-INSOMNIA-BOUNDARY--
`

describe('Integration', () => {
  let server = {} as Server<typeof IncomingMessage, typeof ServerResponse>
  before(async () => {
    server = (await import('../../../src/4-infra/http/native/App')).server
    await new Promise((resolve) => server.once('listening', resolve))
  })
  afterEach(() => {
    cleanDatabase()
  })
  after((done) => server.close(done as any))

  describe('[POST] /api/files', () => {
    it('should return status code 422 if no file is sent', async () => {
      //Act
      const response = await fetch(`${BASE_URL}/files`, {
         method: 'post',
         headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      //Assert
      assert.equal(response.status, 422)
    })
    it('should return status code 422 if file is not of type text/csv', async () => {
      //Act
      const response = await fetch(`${BASE_URL}/files`, {
        method: 'post',
        body: invalidFileBuffer,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      //Assert
      assert.equal(response.status, 422)
      assert.deepEqual(await response.json(), {
        message: 'Some fields are invalid',
        details: [{ field: 'file', error: 'Invalid mimetype file' }],
      })
    })
    it('Should return status code 201 on success', async () => {
      //Act
      const response = await fetch(`${BASE_URL}/files`, {
        method: 'post',
        body: validCsvFile,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      //Assert
      assert.equal(response.status, 201)
    })
  })

  describe('[GET] /api/files', () => {
    const users = [
      {
        city: 'Boa viagem',
        country: 'USA',
        favorite_sport: 'SOCCER',
        name: 'Henrique Vieira',
        id: 'id',
      },
      {
        city: 'Ohio',
        country: 'USA',
        favorite_sport: 'BODYBUILDING',
        name: 'Ronnie Colemman',
        id: 'id2',
      },
    ]

    it('should return status code 200 and a list of all users if the "q" query parameter is not sent', async () => {
      //Arrange
      database.push(...users)
      //Act
      const response = await fetch(`${BASE_URL}/files`, { method: 'get' })
      const data = await response.json()
      //Assert
      assert.equal(response.status, 200)
      assert.deepEqual(data, { users })
    })

    it('should return status code 200 and only the user with id "id" if the "q" query is "HeN"', async () => {
      //Arrange
      database.push(...users)
      //Act
      const response = await fetch(`${BASE_URL}/files?q=${'HeN'}`, {
        method: 'get',
      })
      const data = await response.json()
      //Assert
      assert.equal(response.status, 200)
      assert.deepEqual(data, { users: [users[0]] })
    })

    it('should return status code 200 and only the user with id "id2" if the "q" query is "bodybuilding"', async () => {
      //Arrange
      database.push(...users)
      //Act
      const response = await fetch(`${BASE_URL}/files?q=${'bodybuilding'}`, {
        method: 'get',
      })
      const data = await response.json()
      //Assert
      assert.equal(response.status, 200)
      assert.deepEqual(data, { users: [users[1]] })
    })

    it('should return status code 200 all users if the "q" query is "uSa"', async () => {
      //Arrange
      database.push(...users)
      //Act
      const response = await fetch(`${BASE_URL}/files?q=${'usA'}`, {
        method: 'get',
      })
      const data = await response.json()
      //Assert
      assert.equal(response.status, 200)
      assert.deepEqual(data, { users })
    })

    it('should return status code 200 and only the user with id "id2" if the "q" query is "VIAGEM"', async () => {
      //Arrange
      database.push(...users)
      //Act
      const response = await fetch(`${BASE_URL}/files?q=${'VIAGEM'}`, {
        method: 'get',
      })
      const data = await response.json()
      //Assert
      assert.equal(response.status, 200)
      assert.deepEqual(data, { users: [users[0]] })
    })

    it('should return status code 200 and only the user with id "id2" if the "q" query is "id2"', async () => {
      //Arrange
      database.push(...users)
      //Act
      const response = await fetch(`${BASE_URL}/files?q=${'id2'}`, {
        method: 'get',
      })
      const data = await response.json()
      //Assert
      assert.equal(response.status, 200)
      assert.deepEqual(data, { users: [users[1]] })
    })
  })
})
