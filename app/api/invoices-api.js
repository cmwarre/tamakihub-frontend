/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getInvoices(){
    return api.get("/invoices/");
}

export function searchInvoices(query){
    return api.search("/invoices/", query);
}