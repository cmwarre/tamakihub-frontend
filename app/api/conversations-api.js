import * as api from './';

export function getConversations(onSuccess){
    return api.get("/conversations/", onSuccess);
}

export function getEngineerConversations(engineerID, onSuccess){
    return api.get("/conversations/engineerID=" + engineerID, onSuccess);
}

export function getDayConversations(engineerID, date, onSuccess, onFailure){
    let url = "/conversations/?engineerID=" + engineerID + "&date=" + date;
    return api.get(url, onSuccess, onFailure);
}

export function getConversation(conversationID, onSuccess){
    return api.getOne("/conversations/", conversationID, onSuccess);
}

export function searchConversations(query){
    return api.search("/conversations/", query);
}

export function editConversation(conversationID, data, onSuccess){
    let json = {
        attributes: data,
        type: "conversation"
    };

    return api.edit("/conversations/", conversationID, json, onSuccess);
}

export function addConversation(data, onSuccess){
    let json = {
        attributes: data,
        type: "conversation"
    };

    return api.add("/conversations/", json, onSuccess);
}

export function removeConversation(conversationID, onSuccess, onFailure){
    return api.remove("/conversations/" + conversationID, onSuccess, onFailure);
}