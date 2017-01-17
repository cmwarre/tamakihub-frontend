import * as api from './index';

export function getSkills(onSuccess, onFailure){
    return api.get("/skills/", onSuccess, onFailure)
}

export function searchSkills(onSuccess, onFailure){
    return api.search("/skills/", onSuccess, onFailure);
}