import {AsyncStorage} from 'react-native';

const intialState={
       person:null,
        tododata:'mukesh',
        username:'harsh'
}
const reducer=(state = intialState, action) => {
    debugger
    switch (action.type) {
        case 'AddToDo':
            tododata:action.payload;
            return {tododata: action.payload}
        case 'DeleteToDo':
            tododata:action.payload;
            return {tododata: action.payload}
        case 'getUser':
            return {person: action.payload}
        case 'updateUser':
           return { username:action.payload}

    }
    return state
}
export default reducer;
