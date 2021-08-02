import { useState, useEffect, useReducer, createContext } from 'react';
import { user } from './reducers/userReducer';
import { mode } from './reducers/modeReducer';
import { auth } from '../firebase/firebase';



//get theme from LS:
let themeFromLS;

if (typeof window !== 'undefined') {
    themeFromLS = window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'light';
    localStorage.setItem('theme', themeFromLS);
}


//initial state
const initialState = {
    user : {},
    mode: themeFromLS
}



//create ctx
const Context = createContext({});



//combine reducers
const combineReducers = (reducers) => (state, action) => {
    for (let i = 0; i < reducers.length; i++) {
        state = reducers[i](state, action);
    }

    return state;
}



//ctx provider (returns a component)
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(combineReducers([user, mode]), initialState);
    const value = {state, dispatch};

    //this is some firebase magic that listens to user login/out.
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    }
                });
            } else {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: null
                });
            }
        });

        return () => unsubscribe();
    }, [])

    return <Context.Provider value={value}>{children}</Context.Provider>
}



//export
export {Context, Provider};