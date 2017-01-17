/**
 * Created by cwarren on 12/4/16.
 */
import * as api from './';

export function getPayrolls(onSuccess, onFailure){
    return api.get("/payrolls/", onSuccess, onFailure);
}



export function searchPayrolls(query){
    return api.search("/payrolls/", query);
}

export function getPayroll(id, onSuccess, onFailure){
    return api.getOne("/payrolls/", id, onSuccess, onFailure);
}

export function getPayrollBranches(payrollID, onSuccess, onFailure){
    return api.get("/branches/?payrollID=" + payrollID, onSuccess, onFailure);
}

export function getPayrollEngineers(payrollID, onSuccess, onFailure){
    return api.get("/engineers/?payrollID=" + payrollID, onSuccess, onFailure);
}