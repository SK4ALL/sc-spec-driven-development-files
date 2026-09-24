import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import Database from 'better-sqlite3'

export const DEFAULT_DATABASE_PATH = 'data/agentclinic.db'

export const openDatabase = (path: string): Database.Database => {
  if (path !== ':memory:') {
    mkdirSync(dirname(path), { recursive: true })
  }

  const db = new Database(path)
  db.pragma('foreign_keys = ON')

  return db
}
