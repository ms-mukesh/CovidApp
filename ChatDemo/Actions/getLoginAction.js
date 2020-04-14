import {Api} from '../ApiFile/api'

debugger
export const setChatUserDetail=(data)=>{
    console.log("Action")
    console.log(data)
    return dispatch=>{
        dispatch({
            type: 'userDetail',
            payload:data
        })
    }
}

export const setDays=(data)=>{

    return dispatch=>{
        dispatch({
            type: 'setDays',
            payload:data
        })
    }
}

export const setDailyProgress=(data)=>{

    return dispatch=>{
        dispatch({
            type: 'setDailyProgrees',
            payload:data
        })
    }
}


export const setDailyRecovered=(data)=>{

    return dispatch=>{
        dispatch({
            type: 'setRecoveredCases',
            payload:data
        })
    }
}
export const setScaleForGraph=(data)=>{

    return dispatch=>{
        dispatch({
            type: 'setScaleForGraph',
            payload:data
        })
    }
}

export const setStateData=(data)=>{

    return dispatch=>{
        dispatch({
            type: 'setStateData',
            payload:data
        })
    }
}




export const setDailyCases=(data)=>{
    return dispatch=>{
        dispatch({
            type: 'setDailyCases',
            payload:data
        })
    }
}

export const setLineChartData=(data)=>{
    return dispatch=>{
        dispatch({
            type: 'setLineChartData',
            payload:data
        })
    }
}



export const getLogin=(data)=>{
    debugger
    return dispatch=>{
        console.log(data)
        return Api('getLogin',data,'post')
            .then(res=>{
                dispatch({
                    type:'getLogin',

                    payload:{username:res.data.username,status:res.data.status,phoneno:data.phoneno},
               })
            })
            .catch(err=>{
                console.log(err);
            });
    }
};



export const getRegister=(data)=>{
    debugger
    return dispatch=>{
        return Api('getRegister',data,'post')
            .then(res=>{
                dispatch({
                    type:'getRegister',
                    payload:{username:data.username},
                })
            })
            .catch(err=>{
                console.log(err);
            });
    }
};
