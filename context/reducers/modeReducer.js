export function mode(state, action) {
    switch(action.type) {
        case 'SET_MODE':
            return {...state, mode: action.payload};
        default: 
            return state;
    }
}
