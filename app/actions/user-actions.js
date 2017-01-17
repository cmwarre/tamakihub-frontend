import * as types from './action-types';

export function loginSuccess(token){
    return {
        type: types.LOGIN_SUCCESS,
        token
    }
}