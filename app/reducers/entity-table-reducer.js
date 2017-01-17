import * as types from '../actions/action-types';

const initialState = {
    data: []
};

const listLayoutReducer = function(state = initialState, action) {
    switch(action.type){
        case types.GET_ENTITY_DATA_SUCCESS:
            return Object.assign({}, state, { data: action.data });
    }

    return state;
};

export default listLayoutReducer;