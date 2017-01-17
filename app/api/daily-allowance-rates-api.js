/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getDailyAllowanceRates(){
    return api.get("/daily-allowance-rates/");
}

export function searchDailyAllowanceRates(query){
    return api.search("/daily-allowance-rates/", query);
}