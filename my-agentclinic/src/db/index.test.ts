import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
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
