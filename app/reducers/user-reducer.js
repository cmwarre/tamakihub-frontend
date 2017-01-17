import * as types from '../actions/action-types';

const initialState = {
    token: "",
};

const userReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, { token: action.token });
    }
    return state;
};

export default userReducer;
