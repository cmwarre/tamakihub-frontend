import axios from 'axios';
import store from '../store';
import router from '../router';
import { api_host } from './';
import * as userActions from '../actions/user-actions';
import * as engineerActions from '../actions/engineer-actions';
import * as api from './';

export function getAuthToken(username, password, remember){
    return axios.get(api_host + "/token", {
        auth: {
            username: username,
            password: password
        }
    }).then(response => {
        store.dispatch(userActions.loginSuccess(response.data.token));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("current-user", JSON.stringify(response.data.user.data));
        return response.data.token;
    }).catch(error => {
        console.log(error);
        return "";
    });

}

export function getCurrentUser(){
    try {
        return JSON.parse(localStorage.getItem("current-user"));
    }catch(err){
        router.props.history.push("/login");
    }
}

export function getEngineers(onSuccess, onFailure){
    return(api.get("/engineers/", onSuccess, onFailure));
}

export function searchEngineers(query){
    return(api.search("/engineers/", query));
}

export function getEngineer(id, onSuccess, onFailure){
    return(api.getOne("/engineers/", id, onSuccess, onFailure));
}