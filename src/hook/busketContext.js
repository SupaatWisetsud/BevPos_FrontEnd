import React from 'react';

export const BusketContext = React.createContext();

const reducer = (state = [], action) => {
    
    let checkIndex;
    
    if(action.payload){
        checkIndex = state.findIndex( n => n._id === action.payload._id);
    }

    switch (action.type) {
        case "ADD":
            
            if(checkIndex !== -1){
                
                state[checkIndex].busket_count = state[checkIndex].busket_count + 1;

                return [].concat(state);

            }else return [].concat(state, [Object.assign({}, action.payload, {busket_count: 1})]);

        case "DOWN":
            
            state[checkIndex].busket_count = state[checkIndex].busket_count - 1;

            if(state[checkIndex].busket_count === 0){
                state.splice(checkIndex, 1)
            }

            return [].concat(state);
            
        case "REMOVE":

            state.splice(checkIndex, 1);    

            return [].concat(state);

        case "REMOVE_ALL":
            return [];

        case "CHANGE":
            
            if(action.number > 0 ){
                
                if(action.payload.count >= action.number){
                    state[checkIndex].busket_count = action.number;
                }else{
                    state[checkIndex].busket_count =  state[checkIndex].count;
                }
                
            }else{
                state.splice(checkIndex, 1);    
            }

            return [].concat(state);
            
        default:
            return state;
    }
}
const initialState = []

export const BusketProvider = ({children}) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <BusketContext.Provider value={{state, dispatch}}>
            {children}
        </BusketContext.Provider>
    )
}