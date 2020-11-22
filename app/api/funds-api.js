/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getFunds(onSuccess, onFailure){
    return api.get("/funds/", onSuccess, onFailure);
}

export function searchFunds(query, onSuccess, onFailure){
    return api.search("/funds/", query, onSuccess, onFailure);
}