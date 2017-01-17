/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getBranches(onSuccess, onFailure){
    return api.get("/branches/");
}

export function searchBranches(query){
    return api.search("/branches/", query);
}

export function getOpenJobs(id, onSuccess, onFailure){
    return api.get("/jobs/open?branchID=" + id, onSuccess, onFailure);
}

export function getBranch(id, onSuccess, onFailure){
    return api.getOne("/branches/", id, onSuccess, onFailure);
}