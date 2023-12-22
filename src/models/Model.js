import Collection from './Collection'

export default class Model {
  #data = null
    
  constructor(data) {
    this.#data = data
  }

  checkDataValidity() {
    if (typeof this.data === 'string') {
      this.convertToJson()
    }
    if ((typeof this.data !== 'object') || Array.isArray(this.data)) {
      throw new Error('[MODEL] - data should be an Object !')
    }
  }

  convertToJson() {
    try {
      this.#data = JSON.parse(this.data)
    } catch (error) {
      throw new Error(`[MODEL] - ${ error }`)
    }
  }

  sanitizeData(fields) {
    const baseFieldsKeys = fields
    for (let key in this.#data) {
      if (!(key in baseFieldsKeys)) {
        delete this.#data[key]
      }
    }
  }

  get data() {
    return this.#data
  }

  static blank() {
    return this.fields()
  }

  static make(data = null) {
    const localModel = new this(data)
    const fields = this.fields()
    localModel.checkDataValidity()
    localModel.sanitizeData(fields)
    return { ...fields, ...localModel.data }
  }

  static toCollection(data) {
    return Collection.make(this, data)
  }

  static withMapping(data = null) {
    const localModel = new this(data)
    localModel.checkDataValidity()
    const localData = this.make(data)
    if ((this.map !== undefined) && (typeof this.map === 'function')) {
      const localMapping = this.map()
      for (let key in localMapping) {
        if ((typeof localMapping[key] === 'function') && (key in localData)) {
          localData[key] = localMapping[key](localData[key])
        }
      }
    }
    return localData
  }
}
