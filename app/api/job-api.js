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

export function getJobInvoices(id, onSuccess, onFailure){
    return api.get("/invoices/?jobID=" + id, onSuccess, onFailure);
}

export function getJobFunds(id, onSuccess, onFailure){
    return api.get("/funds/?jobID=" + id, onSuccess, onFailure);
}

export function getJobHours(id, onSuccess, onFailure){
    return api.get("/hours/?jobID=" + id, onSuccess, onFailure);
}

export function getJobDistances(id, onSuccess, onFailure){
    return api.get("/distances/?jobID=" + id, onSuccess, onFailure);
}

export function getJobExpenses(id, onSuccess, onFailure){
    return api.get("/expenses/?jobID=" + id, onSuccess, onFailure);
}