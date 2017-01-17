/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getBookingTypes(onSuccess){
    return api.get("/booking-types/", onSuccess);
}

export function searchBookingTypes(query){
    return api.search("/booking-types/", query);
}