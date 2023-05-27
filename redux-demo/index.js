import  {bindActionCreators, combineReducers, applyMiddleware, createStore} from 'redux';

import pkg from 'redux-logger';

const createLogger = pkg.createLogger;

const logger = createLogger({
    colors: {
        title: () => '#1912e3',
        prevState: () => '#9E9E9E',
        action: () => '#03A9F4',
        nextState: () => '#1912e3',
        error: () => '#F20404',
      },
})

//actions type
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED  = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED  = 'ICECREAM_RESTOCKED';




//ACTION FUNCTIONS
function orderCake(qty=1) {
    return {
        type: CAKE_ORDERED,
        payload: qty,
    }
}

function restockCake(qty=1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIcecream(qty=1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIcecream(qty=1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}


const initialCakeState = {
    numOfCakes: 10,
}

const initailIcecreamState = {
    numOfIcecream: 20,
}

const cakeReducer = ( state = initialCakeState, action ) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload,
            };

        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        

        default: 
            return state
    }
}
const icecreamReducer = ( state = initailIcecreamState, action ) => {
    switch(action.type){
        case CAKE_ORDERED:
            case ICECREAM_ORDERED:
                return {
                    ...state,
                    numOfIcecream: state.numOfIcecream - action.payload,
                };
    
            case ICECREAM_RESTOCKED:
                return {
                    ...state,
                    numOfIcecream: state.numOfIcecream + action.payload,
                }
        
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: icecreamReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger))


console.log('initial state is :', store.getState());

const unsubscribe = store.subscribe(() => console.log('updated state ', store.getState()));

//u can dispatch in two way
//1st way 
// store.dispatch(orderCake);
// store.dispatch(orderCake);
// store.dispatch(restockCake())

//2nd way
const actions = bindActionCreators(
        {orderCake, restockCake, orderIcecream, restockIcecream}
        , store.dispatch
    )

actions.orderCake(2);
actions.orderIcecream(3);
actions.restockCake(3);
actions.restockIcecream(2)



unsubscribe();
//if the store was unscribe the dispatch function will not work
store.dispatch(orderCake());

