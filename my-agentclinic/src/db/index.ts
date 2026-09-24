import { mkdirSync, readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import Database from 'better-sqlite3'

export const DEFAULT_DATABASE_PATH = 'data/agentclinic.db'

const SCHEMA_URL = new URL('./schema.sql', import.meta.url)

export const openDatabase = (path: string): Database.Database => {
  if (path !== ':memory:') {
    mkdirSync(dirname(path), { recursive: true })
  }

  const db = new Database(path)
  db.pragma('foreign_keys = ON')
  db.exec(readFileSync(SCHEMA_URL, 'utf8'))

  return db
}
