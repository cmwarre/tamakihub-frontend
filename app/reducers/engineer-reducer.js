import * as types from '../actions/action-types';

const initialState = {
    engineer: {}
};

const engineerReducer = function(state = initialState, action) {
    switch(action.type){
        case types.GET_ENGINEER_SUCCESS:
            return Object.assign({}, state, { engineer: action.engineer });
    }

    return state;
};

export default engineerReducer;