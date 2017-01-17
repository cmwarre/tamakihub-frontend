/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getTasks(onSuccess){
    return api.get("/tasks/", onSuccess);
}

export function searchTasks(query){
    return api.search("/tasks/", query);
}