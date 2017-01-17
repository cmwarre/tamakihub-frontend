import * as api from './';

export function getDistances(onSuccess){
    return api.get("/distances/", onSuccess);
}

export function getEngineerDistances(engineerID, onSuccess){
    return api.get("/distances/engineerID=" + engineerID, onSuccess);
}

export function getDayDistances(engineerID, date, onSuccess, onFailure){
    let url = "/distances/?engineerID=" + engineerID + "&date=" + date;
    return api.get(url, onSuccess, onFailure);
}

export function getDistance(distanceID, onSuccess, onFailure){
    return api.getOne("/distances/", distanceID, onSuccess, onFailure);
}

export function searchDistances(query){
    return api.search("/distances/", query);
}

export function editDistance(distanceID, data, onSuccess, onFailure){
    let json = {
        attributes: data,
        type: "distance"
    };

    return api.edit("/distances/", distanceID, json, onSuccess, onFailure);
}

export function addDistance(data, onSuccess){
    let json = {
        attributes: data,
        type: "distance"
    };

    return api.add("/distances/", json, onSuccess);
}

export function removeDistance(distanceID, onSuccess, onFailure){
    return api.remove("/distances/" + distanceID, onSuccess, onFailure);
}