import Model from '../models/Model.js'

export default class User extends Model {
    static fields() {
        return {
            id: -1,
            first_name: '',
            last_name: '',
            full_name: '',
        }
    }
}