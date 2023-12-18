import { beforeEach } from 'vitest'
import Model from '@/models/Model'

const myUser = { id: 999, name: 'toto', lolilol: 'Resr'}
const myUserAsString = JSON.stringify(myUser)
const myUserAsStringInvalidJson = myUserAsString.slice(0, -1)

describe('Model.js', () => {
  class User extends Model {
    static fields() {
      return {
        id: -1,
        name: ''
      }
    }
  }

  describe('Model.js init data object', () => {
    it('should get proper data', () => {
      const user = new User({ id: 1 })
      expect(user.data).toStrictEqual({ id: 1 })
    })
    it('should return empty formatted object if fields are set', () => {
      expect(User.blank()).toStrictEqual({ id: -1, name: '' })
    })
    it('should return filled formatted object if fields are set and data provided', () => {
      expect(User.make(myUser)).toStrictEqual({ id: 999, name: 'toto' })
    })
    it('should formatted object if fields are set and json string provided', () => {
      expect(User.make(myUserAsString)).toStrictEqual({ id: 999, name: 'toto' })
    })
  })

  describe('Model.js errors', () => {
    it('should throw `data should be an Object` error with an array', () => {
      expect(() => User.make([ 1 ])).toThrowError('[MODEL] - data should be an Object !')
    })
    it('should throw `is not valid JSON` error with a string', () => {
      expect(() => User.make("dummy")).toThrowError(/JSON/)
    })
    it('should throw `is not valid JSON` error with an actual invalid JSON', () => {
      expect(() => User.make(myUserAsStringInvalidJson)).toThrowError(/JSON/)
    })
  })
})

