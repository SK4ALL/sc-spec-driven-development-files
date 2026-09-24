import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import type Database from 'better-sqlite3'
import { openDatabase } from './index.js'

describe('openDatabase', () => {
  let tempDir: string | undefined

  afterEach(() => {
    if (tempDir) rmSync(tempDir, { recursive: true, force: true })
    tempDir = undefined
  })

  it('opens an in-memory database', () => {
    const db = openDatabase(':memory:')

    expect(db.prepare('select 1 as ok').get()).toEqual({ ok: 1 })
    db.close()
  })

  it('turns on foreign keys', () => {
    const db = openDatabase(':memory:')

    expect(db.pragma('foreign_keys', { simple: true })).toBe(1)
    db.close()
  })

  it('creates a missing parent folder and the database file', () => {
    tempDir = mkdtempSync(join(tmpdir(), 'agentclinic-'))
    const path = join(tempDir, 'missing', 'test.db')

    const db = openDatabase(path)

    expect(existsSync(path)).toBe(true)
    db.close()
  })
})

describe('schema', () => {
  let tempDir: string | undefined

  afterEach(() => {
    if (tempDir) rmSync(tempDir, { recursive: true, force: true })
    tempDir = undefined
  })

  const columnNames = (db: Database.Database) =>
    (db.pragma('table_info(agents)') as { name: string }[]).map((c) => c.name)

  it('creates the agents table with the expected columns', () => {
    const db = openDatabase(':memory:')

    expect(columnNames(db)).toEqual(['id', 'name', 'model', 'bio', 'created_at'])
    db.close()
  })

  it('starts with no agents', () => {
    const db = openDatabase(':memory:')

    expect(db.prepare('select count(*) as count from agents').get()).toEqual({ count: 0 })
    db.close()
  })

  it('requires a name', () => {
    const db = openDatabase(':memory:')

    expect(() => db.prepare('insert into agents (model) values (?)').run('GPT-ish')).toThrow(
      /NOT NULL constraint failed: agents.name/
    )
    db.close()
  })

  it('fills in id and created_at automatically', () => {
    const db = openDatabase(':memory:')

    db.prepare('insert into agents (name) values (?)').run('Claudette')
    const agent = db.prepare('select id, created_at from agents').get() as {
      id: number
      created_at: string
    }

    expect(agent.id).toBe(1)
    expect(agent.created_at).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    db.close()
  })

  it('is safe to apply again and keeps existing rows', () => {
    tempDir = mkdtempSync(join(tmpdir(), 'agentclinic-'))
    const path = join(tempDir, 'test.db')

    const first = openDatabase(path)
    first.prepare('insert into agents (name) values (?)').run('Claudette')
    first.close()

    const second = openDatabase(path)
    expect(second.prepare('select name from agents').all()).toEqual([{ name: 'Claudette' }])
    second.close()
  })
})
