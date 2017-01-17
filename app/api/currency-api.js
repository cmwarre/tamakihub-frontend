/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getCurrencies(){
    return api.get("/currencies/");
}

export function searchCurrencies(query){
    return api.search("/currencies/", query);
}

export function getCurrency(id, onSuccess, onFailure){
    return api.getOne("/currencies/", id, onSuccess, onFailure);
}