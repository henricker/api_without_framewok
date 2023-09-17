import database from '../../../src/4-infra/db/database'

export function cleanDatabase() {
  while (database.length > 0) {
    database.pop()
  }
}
