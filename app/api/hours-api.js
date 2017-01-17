import * as api from './';

export function getHours(onSuccess){
    return api.get("/hours/", onSuccess);
}

export function getEngineerHours(engineerID, onSuccess){
    return api.get("/hours/engineerID=" + engineerID, onSuccess);
}

export function getDayHours(engineerID, date, onSuccess, onFailure){
    let url = "/hours/?engineerID=" + engineerID + "&date=" + date;
    return api.get(url, onSuccess, onFailure);
}

export function getHour(hourID, onSuccess, onFailure){
    return api.getOne("/hours/", hourID, onSuccess, onFailure);
}

export function searchHours(query){
    return api.search("/hours/", query);
}

export function editHour(hourID, data, onSuccess, onFailure){
    let json = {
        attributes: data,
        type: "hour"
    };

    return api.edit("/hours/", hourID, json, onSuccess, onFailure);
}

export function addHour(data, onSuccess){
    let json = {
        attributes: data,
        type: "hour"
    };

    return api.add("/hours/", json, onSuccess);
}

export function removeHour(hourID, onSuccess, onFailure){
    return api.remove("/hours/" + hourID, onSuccess, onFailure);
}