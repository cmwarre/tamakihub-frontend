import * as types from './action-types';

export function getHoursSuccess(hours){
    return {
        type: types.GET_HOURS_SUCCESS,
        hours
    }
}

export function getHourSuccess(hour){
    return {
        type: types.GET_HOUR_SUCCESS,
        hour
    }
}

export function addHourSuccess(hour){
    return {
        type: types.ADD_HOUR_SUCCESS,
        hour
    }
}

export function editHourSuccess(hour){
    return {
        type: types.EDIT_HOUR_SUCCESS,
        hour
    }
}

export function deleteHourSuccess(hourId){
    return {
        type: types.DELETE_HOUR_SUCCESS,
        hourId
    }
}