/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getClientReleases(){
    return api.get("/client-releases/");
}

export function searchClientReleases(query){
    return api.search("/client-releases/", query);
}