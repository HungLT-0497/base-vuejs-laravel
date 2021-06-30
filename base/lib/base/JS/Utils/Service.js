import Axios from 'axios'

class Service {
    get(url, params = {}) {

        return new Promise(function (resolve, reject) {
            Axios.get(url, {params: params
            }).then(response => {
                localStorage.setItem('token', response.data.token)
                // window.token = response.data.token;
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        });
    }

    post(url, params = {}, config = {}) {
        return new Promise(function (resolve, reject) {

            Axios.defaults.headers['x-csrf-token'] = localStorage.getItem('token');
            // Axios.defaults.headers['x-csrf-token'] = window.token;
            Axios.post(url, params, config).then(response => {
                localStorage.setItem('token', response.data.token)
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        });
    }

    put(url, params = {}) {
        return new Promise(function (resolve, reject) {
            Axios.defaults.headers['x-csrf-token'] = localStorage.getItem('token');
            Axios.put(url, params).then(response => {
                localStorage.setItem('token', response.data.token);
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        });
    }

    delete(url, params = {}) {
        return new Promise(function (resolve, reject) {
            Axios.defaults.headers['x-csrf-token'] = localStorage.getItem('token');
            Axios.delete(url, {params: params})
                .then(resp => {
                    localStorage.setItem('token', resp.data.token);
                    resolve(resp);
                }).catch(error => {
                reject(error)
            })
        })
    }
}

export default new Service;
