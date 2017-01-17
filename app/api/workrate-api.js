/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getWorkRates(onSuccess){
    return api.get("/workrates/", onSuccess);
}

export function getEngineerWorkRates(engineerId, onSuccess){
    return api.get("/workrates/?engineerID=" + engineerId, onSuccess);
}

export function searchWorkRates(query){
    return api.search("/workrates/", query);
}