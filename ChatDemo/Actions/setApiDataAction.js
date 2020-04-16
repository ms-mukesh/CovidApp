import {Api} from '../ApiFile/api'

export const setDays=(data)=>{
    return dispatch=>{
        dispatch({
            type: 'setDays',
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
