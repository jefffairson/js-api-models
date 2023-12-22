import Model from '../models/Model.js'

export default class User extends Model {
    static fields() {
        return {
            id: -1,
            first_name: '',
            last_name: '',
            full_name: '',
            created_at: new Date(),
            admin: {},
            records: []
        }
    }

    static map() {
        return {
            admin: (admin) => User.make(admin),
            created_at: (created_at) => new Date(created_at),
            records: (records) => User.toCollection(records)
        }
    }
}