import axios from 'axios';
export const Api = (url1, data, method) => {
  let baseurl = 'http://192.168.200.146:9001/';
  let url = baseurl + url1;
  switch (method) {
    case 'get':
      debugger;
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
