import ModelClass from './Model.js'

export default class collection {
    static make(Model = null, data = null) {
        if (Model === null) {
            throw new Error('[COLLECTION] - DATA missing to create collection ! A Model should be provided')
        }
        if (Object.getPrototypeOf(Model).name !== ModelClass.name) {
            throw new Error('[COLLECTION] - The provided Object is not a Model definition')
        }
        if (data === null) {
            throw new Error('[COLLECTION] - DATA missing to create collection ! An array of objects is required')
        }
        if (Array.isArray(data) === false) {
            throw new Error('[COLLECTION] - DATA should be an Array !')
        }
        // https://stackoverflow.com/questions/4215737/how-to-convert-an-array-into-an-object
        return data
            .map((item) => Model.make(item))
            /*.reduce(function(acc, cur, i) {
                acc[cur.id] = cur;
                return acc;
              }, {})*/
    }
}