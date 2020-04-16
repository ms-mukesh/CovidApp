import {AsyncStorage} from 'react-native';

const intialState={
        username:'ajay',
        status:'',
        phoneno:'',
        receiverName:'mukesh',
        recieverPhoneNo:'',
        dayArray:[],
        dailyCases:[],
        recoveredCases:[],
        dailyProgres:[],
        stateDataFinal:[],
        dailyDeathData:[],
        lineChartData:{},
        maxDailyProgrees:0,
        maxDailyCases:0,
        maxDailyRecovered:0,
        backTemp:0

}

const reducer=(state = intialState, action) => {
     switch (action.type) {
         case 'setDays':
             state.dayArray=action.payload
             return state
         case 'setDailyProgrees':
             state.dailyProgres=action.payload
             return state

         case 'setRecoveredCases':
             state.recoveredCases=action.payload
             return state

         case 'setLineChartData':
             state.lineChartData=action.payload
             return state

         case 'setDailyCases':
             state.dailyCases=action.payload
             return state
         case 'setDailyDeath':
             state.dailyDeathData=action.payload
             return state
         case 'setStateData':
             state.stateDataFinal=action.payload
             return state

         case 'setScaleForGraph':
             state.maxDailyCases=action.payload.maxDailyCases
             state.maxDailyProgrees=action.payload.maxDailyProgress
             state.maxDailyRecovered=action.payload.maxDailyReovered

             return state
         case 'getLogin':
            status:action.payload.status
            if(action.payload.status==1)
            {
                state.username=action.payload.username;
                state.phoneno=action.payload.phoneno;
            }
            return {username: action.payload.username,status:action.payload.status,phoneno:action.payload.phoneno }

            case 'setBackIndex':
             state.backTemp=action.payload
             return state.backTemp
         case 'userDetail':
             state.receiverName=action.payload.username;
             state.recieverPhoneNo=action.payload.phoneno;


   }
    return state
}
export default reducer;
