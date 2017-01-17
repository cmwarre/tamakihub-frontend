import * as api from './';

export function getExpenses(onSuccess){
    return api.get("/expenses/", onSuccess);
}

export function getEngineerExpenses(engineerID, onSuccess){
    return api.get("/expenses/engineerID=" + engineerID, onSuccess);
}

export function getDayExpenses(engineerID, date, onSuccess, onFailure){
    let url = "/expenses/?engineerID=" + engineerID + "&date=" + date;
    return api.get(url, onSuccess, onFailure);
}

export function getExpense(expenseID, onSuccess, onFailure){
    return api.getOne("/expenses/", expenseID, onSuccess, onFailure);
}

export function searchExpenses(query){
    return api.search("/expenses/", query);
}

export function editExpense(expenseID, data, onSuccess, onFailure){
    let json = {
        attributes: data,
        type: "expense"
    };

    return api.edit("/expenses/", expenseID, json, onSuccess, onFailure);
}

export function addExpense(data, onSuccess){
    let json = {
        attributes: data,
        type: "expense"
    };

    return api.add("/expenses/", json, onSuccess);
}

export function removeExpense(expenseID, onSuccess, onFailure){
    return api.remove("/expenses/" + expenseID, onSuccess, onFailure);
}