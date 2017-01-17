/**
 * Created by cwarren on 11/25/16.
 */
import * as types from './action-types';

export function getEntityDataSuccess(data){
    return {
        type: types.GET_ENTITY_DATA_SUCCESS,
        data
    }
}