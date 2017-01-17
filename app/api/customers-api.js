/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getCustomers(){
    return api.get("/customers/");
}

export function searchCustomers(query){
    return api.search("/customers/", query);
}

export function getCustomer(id, onSuccess, onFailure){
    return api.getOne("/customers/", id, onSuccess, onFailure);
}