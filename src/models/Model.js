export default class Model {
  #data = null
    
  constructor(data) {
    this.#data = data
  }

  checkDataValidity() {
    if (typeof this.data === 'string') {
      this.convertToJson()
    }
    if (typeof this.data !== 'object') {
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
}
