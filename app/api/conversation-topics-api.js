/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getConversationTopics(onSuccess, onFailure){
    return api.get("/conversation-topics/", onSuccess, onFailure);
}

export function searchConversationTopics(query){
    return api.search("/conversation-topics/", query);
}