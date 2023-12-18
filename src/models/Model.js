export default class Model {
    #data
    
    constructor(data) {
        this.data = data
    }
    
    /*static make(data = null) {
        if (typeof data === 'string') {
            data = this.convertToJson(data)
        }
        if (typeof data !== 'object') {
            throw new Error('DATA should be an Object !')
        }
        return data === null
            ? this.fields()
            : { ...this.fields(), ...this.sanitize(data) }
    }

    static convertToJson(data) {
        try {
            data = JSON.parse(data)
        } catch (error) {
            throw new Error(error)
        }
        return data
    }

    static sanitize(data) {
        const baseFieldsKeys = this.fields()
        for (let key in data) {
            if(!(key in baseFieldsKeys)) {
                delete data[key]
            }
        }
        return data
    }*/
}