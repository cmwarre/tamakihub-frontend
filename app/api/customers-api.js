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

export function getCustomerJobs(id, onSuccess, onFailure){
    return api.get("/jobs/open?endCustomerID=" + id, onSuccess, onFailure);
}

export function getCustomerInvoiceAddresses(id, onSuccess, onFailure){
    return api.get("/invoice-addresses/?customerID=" + id, onSuccess, onFailure);
}