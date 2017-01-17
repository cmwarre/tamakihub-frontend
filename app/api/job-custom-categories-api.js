import * as api from './index';


export function getJobCustomCategories(onSuccess) {
    return api.get("/job-custom-categories/", onSuccess);
}

export function getCategoriesByJob(jobID, onSuccess) {
    return api.get("/job-custom-categories/?jobID=" + jobID, onSuccess);
}

export function searchJobs(query){
    return api.search("/job-custom-categories/", query);
}

