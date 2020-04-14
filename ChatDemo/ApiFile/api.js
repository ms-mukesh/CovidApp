import axios from 'axios';
export const Api = (url1, data, method) => {
    let baseurl = 'https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/chatApp/api/';
    let url =  baseurl+url1;
    debugger
    switch (method) {
        case 'get':
            return axios
                .get(url)
                .then(res => {
                    // console.log(res)
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return err;
                });
        case 'post':
            return axios
                .post(url, data)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return err;
                });

    }
};
