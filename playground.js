import Model from './src/models/Model.js'
import Collection from './src/models/Collection.js'
import User from './src/dummy/UserModel.js'

const model = Model
const user = User

const myData = { id: 999, name: 'toto', lolilol: 'Resr'}
const myDataBis = { id: 988, name: 'toto', lolilol: 'Resr'}
const myDataTris = { id: 98, name: 'toto', lolilol: 'Resr'}
const myDataAsString = JSON.stringify(myData)
const myDataAsStringNotJson = myDataAsString.slice(0, -1)
const myCollection = [
    { id: 1, name: 'toto', nom: 'Resr 1'},
    { id: 2, name: 'titi', prenom: 'Resr 2'},
    { id: 3, name: 'tata', full_name: 'Resr 3'},
]

// const collection = Collection.make(User, myCollection)

console.log(
    user.withMapping({ id: 999, records: [ myDataBis, myDataTris] }),
    // user.make(999)
    // myData,
    // user.make({...myData}),
    // user.toCollection(myCollection)
    // User.make(myDataAsString)
    // collection
)