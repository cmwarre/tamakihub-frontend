/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getExpenseCategories(onSuccess, onFailure){
    return api.get("/expense-categories/", onSuccess, onFailure);
}

export function searchExpenseCategories(query){
    return api.search("/expense-categories/", query);
}