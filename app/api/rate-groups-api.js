/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getRateGroups(){
    return api.get("/rate-groups/");
}

export function searchRateGroups(query){
    return api.search("/rate-groups/", query);
}