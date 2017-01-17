/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getChangeRequests(){
    return api.get("/change-requests/");
}

export function searchChangeRequests(query){
    return api.search("/change-requests/", query);
}