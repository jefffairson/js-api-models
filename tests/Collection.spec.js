import { beforeEach } from 'vitest'
import Model from '@/models/Model'
import Collection from '@/models/Collection'

const validUser = { id: 999, name: 'toto' }
const myUser = { id: 999, name: 'toto', lolilol: 'Resr' }
const myUserAsString = JSON.stringify(myUser)
const myUserAsStringInvalidJson = myUserAsString.slice(0, -1)
const myUsers = [
  myUser,
  myUserAsString,
  validUser,
]

describe('Collection.js', () => {
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
      expect(Collection.make(User, myUsers)).toStrictEqual([
        myUser,
        myUser,
        myUser,
      ])
    })
    it('should make Collection if string provided', () => {
      expect(Collection.make(User, JSON.stringify(myUsers))).toStrictEqual([
        myUser,
        myUser,
        myUser,
      ])
    })
  })

  describe('Collection.js errors', () => {
    it('should throw `A Model should be provided` if no data provided', () => {
      expect(() => Collection.make()).toThrowError('[COLLECTION] - DATA missing to create collection ! A Model should be provided')
    })
    it('should throw `not a Model definition` if no valid Model provided', () => {
      expect(() => Collection.make({})).toThrowError('[COLLECTION] - The provided Object is not a Model definition')
    })
    it('should throw `DATA missing` if no data provided', () => {
      expect(() => Collection.make(User)).toThrowError('[COLLECTION] - DATA missing to create collection ! An array of objects is required')
    })
    it('should throw `DATA should be an Array` if no Array data provided', () => {
      expect(() => Collection.make(User, {})).toThrowError('[COLLECTION] - DATA should be an Array !')
    })
  })
})

