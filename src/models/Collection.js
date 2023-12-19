import ModelClass from './Model.js'

export default class Collection {
  #Model
  #data

  constructor(Model = null, data = null) {
    this.#Model = Model
    this.#data = data
  }

  get Model() {
    return this.#Model
  }

  get data() {
    return this.#data
  }

  checkDataValidity() {
    if (this.#Model === null) {
      throw new Error('[COLLECTION] - DATA missing to create collection ! A Model should be provided')
    }
    if (Object.getPrototypeOf(this.Model).name !== ModelClass.name) {
      throw new Error('[COLLECTION] - The provided Object is not a Model definition')
    }
    if (this.data === null) {
      throw new Error('[COLLECTION] - DATA missing to create collection ! An array of objects is required')
    }
    if (typeof this.data === 'string') {
      this.#data = JSON.parse(this.data)
    }
    if (Array.isArray(this.data) === false) {
      throw new Error('[COLLECTION] - DATA should be an Array !')
    }
  }

  static make(Model = null, data = null) {
    const localCollection = new this(Model, data)
    localCollection.checkDataValidity()
    // https://stackoverflow.com/questions/4215737/how-to-convert-an-array-into-an-object
    return localCollection.data.map((item) => Model.make(item))
  }
}