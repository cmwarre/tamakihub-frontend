import axios from 'axios';
import router from '../router';
import store from '../store';
import * as entityTableActions from '../actions/entity-table-actions';

//export const api_host='http://127.0.0.1:8080';
//export const api_host = 'http://192.168.1.17:8080';
export const api_host = 'http://api.tamaki-control.com:/hub';

export function get(uri, onSuccess, onFailure){

    let route = api_host + "/api/v1" + uri;
    store.dispatch(entityTableActions.getEntityDataSuccess([]));

    return axios.get(route, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        auth: {
            username: localStorage.getItem("token")
        }
    }).then(response => {
        store.dispatch(entityTableActions.getEntityDataSuccess(response.data['data']));
        return onSuccess ? onSuccess(response) : null;
    }).catch(error => {
        defaultErrorHandler(error);
        return onFailure ? onFailure(error) : null;
    });
}

export function search(uri, query, onSuccess, onFailure) {
    return axios.get(api_host + "/api/v1" + uri + "search/" + query, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        auth: {
            username: localStorage.getItem("token")
        }
    }).then(response => {
        store.dispatch(entityTableActions.getEntityDataSuccess(response.data['data']));
        return onSuccess ? onSuccess(response) : null;
    }).catch(error => {
        defaultErrorHandler(error);
        return onFailure ? onFailure(error) : null;
    });
}

export function getOne(uri, id, onSuccess, onFailure){
    let url = api_host + "/api/v1" + uri + id;
    return axios.get(url, {
        auth: {
            username: localStorage.getItem("token")
        }
    }).then(response => {
        return onSuccess ? onSuccess(response) : null;
    }).catch(error => {
        defaultErrorHandler(error);
        return onFailure ? onFailure(error) : null;
    });

}

export function edit(uri, id, data, onSuccess, onFailure) {
    let url = api_host + "/api/v1" + uri + id;
    return axios.put(url, {data: data},
        {
            auth: {username: localStorage.getItem("token")}
        }).then(response => {
        console.log(response);
        return onSuccess ? onSuccess(response) : null;
    }).catch(error => {
        return onFailure ? onFailure(error) : null;
    });

}

export function add(uri, data, onSuccess, onFailure){
    return axios.post(api_host + "/api/v1" + uri, {data: data},
        {
        auth: {
            username: localStorage.getItem("token")
        }
    }).then(response => {
        console.log(response.data);
        return onSuccess ? onSuccess(response) : null;
    }).catch( error => {
        defaultErrorHandler(error);
        return onFailure ? onFailure(error) : null;
    });
}

export function remove(uri, onSuccess, onFailure){
    return axios.delete(api_host + "/api/v1" + uri, {
            auth: {
                username: localStorage.getItem("token")
            }}
    ).then(response => {
        return onSuccess ? onSuccess(response) : null;
    }).catch(error => {
        defaultErrorHandler(error);
       return onFailure ? onFailure(error) : null;
    });
}


function defaultErrorHandler(error){
    if(error.status == 401){
        router.props.history.push("/login");
    }
}
















