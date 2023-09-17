import database from "@infra/db/database";

export function cleanDatabase() {
  while (database.length > 0) {
    database.pop()
  }
}
