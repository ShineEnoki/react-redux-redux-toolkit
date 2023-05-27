const store = require('./app/store.js')

//actions
const { icecreamActions } = require('./features/icecream/iceCreamSlice.js')
const cakeActions = require('./features/cake/cakeSlice.js').cakeActions;
const fetchUsers = require('./features/user/userSlice.js').fetchUsers

console.log('Initail State: ', store.getState())

const unsuscribe = store.subscribe( () => {
    console.log('Update state ', store.getState())
})

// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(icecreamActions.restocked(5))
store.dispatch(fetchUsers())

// store.dispatch()

// unsuscribe()