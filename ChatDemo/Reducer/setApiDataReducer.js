import {AsyncStorage} from 'react-native';

const intialState={
    dayArray:[]
}
const reducer=(state = intialState, action) => {
    switch (action.type) {
        case 'setDays':
            state.dayArray=action.payload
            return state

        case 'userDetail':
            state.receiverName=action.payload.username;
            state.recieverPhoneNo=action.payload.phoneno;
            return state


    }
    return state
}
export default reducer;
