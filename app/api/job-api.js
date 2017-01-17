import * as api from './index';


export function getJobs(onSuccess) {
    return api.get("/jobs/", onSuccess);
}

export function getOpenJobs(onSuccess) {
    return api.get("/jobs/open", onSuccess);
}

export function searchJobs(query){
    return api.search("/jobs/", query);
}

export function getJob(id, onSuccess, onFailure){
    return api.getOne("/jobs/", id, onSuccess, onFailure);
}