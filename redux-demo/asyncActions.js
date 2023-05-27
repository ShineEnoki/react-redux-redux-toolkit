import { createStore, applyMiddleware } from 'redux'
import {default as thunk} from 'redux-thunk'
import axios from "axios";


const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    }
}
const fetchUsersFailure = (err) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: err
    }
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case 'FETCH_USERS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case 'FETCH_USERS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }
}


//thunk funtion
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then( res => {
                const users = res.data;
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const middleware = applyMiddleware(thunk.default);

const store = createStore(reducer, middleware)

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers())