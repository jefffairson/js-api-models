import { beforeEach } from 'vitest'
import Model from '@/models/Model'

const validUser = { id: 999, name: 'toto' }
const myUser = { id: 999, name: 'toto', lolilol: 'Resr' }
const myUserAsString = JSON.stringify(myUser)
const myUserAsStringInvalidJson = myUserAsString.slice(0, -1)
const myUsers = [
  myUser,
  myUserAsString,
  validUser,
]

describe('Model.js', () => {
  class User extends Model {
    static fields() {
      return {
        id: -1,
        name: '',
        related: {},
        team: [],
        created_at: new Date()
      }
    }
    static map() {
      return {
        created_at: (created_at) => new Date(created_at),
        related: (related) => User.make(related),
        team: (team) => User.toCollection(team),
      }
    }
  }

  describe('Model.js map Date', () => {
    it('should map with current Date', () => {
      const user = User.withMapping({ id: 1 })
      expect(user.id).toBe(1)
      expect(user.created_at.toString()).toStrictEqual((new Date()).toString())
    })
    it('should map with specific sql Date', () => {
      const user = User.withMapping({ id: 2, created_at: '2023-11-10' })
      expect(user.id).toBe(2)
      expect(user.created_at.toString()).toStrictEqual((new Date('2023-11-10')).toString())
    })
  })

  describe('Model.js map Model', () => {
    it('should map with blank Model', () => {
      const user = User.withMapping({ id: 1 })
      expect(user.related).toStrictEqual(User.blank())
    })
    it('should map with specific Model', () => {
      const related = { id: 999, name: 'toto' }
      const user = User.withMapping({ id: 1, related })
      expect(user.related).toStrictEqual(User.make(related))
      expect(user.related.related).toStrictEqual({})
    })
    it('should map with specific Model and sanitized data', () => {
      const related = { id: 999, name: 'toto', fake: 'unknown' }
      const user = User.withMapping({ id: 1, related })
      expect(user.related).toStrictEqual(User.make(related))
      expect(user.related.fake).toBe(undefined)
    })
  })

  describe('Model.js map Collection', () => {
    it('should map a blank Array', () => {
      const user = User.withMapping({ id: 1 })
      expect(user.team).toStrictEqual([])
    })
    it('should map a populated Array and sanitize to model', () => {
      const userBlank = User.blank()
      const userWithData = User.make({ id: 1 })
      const userWithAdditionalData = User.make({ id: 2, fake: 'unknown' })
      const team = [ userBlank, userWithData, userWithAdditionalData ]
      const user = User.make({ id: 1, team })
      expect(user.team.length).toBe(3)
      expect(user.team[0].id).toBe(-1)
      expect(user.team[1].id).toBe(1)
      expect(user.team[2].id).toBe(2)
      expect(user.team[2].fake).toBe(undefined)
    })
  })
})

