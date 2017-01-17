/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getPurchaseOrders(){
    return api.get("/purchase-orders/");
}

export function searchPurchaseOrders(query){
    return api.search("/purchase-orders/", query);
}