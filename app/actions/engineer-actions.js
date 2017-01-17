import * as types from './action-types';

export function getEngineersSuccess(engineers){
    return {
        type: types.GET_ENGINEERS_SUCCESS,
        engineers
    }
}

export function getEngineerSuccess(engineer){
    return {
        type: types.GET_ENGINEER_SUCCESS,
        engineer
    }
}

export function getEngineerFailure(error){
    return {
        type: types.GET_ENGINEER_FAILURE
    }
}