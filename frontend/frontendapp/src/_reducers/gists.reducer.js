import { userConstants } from '../_constants';

export function gists(state = {}, action) {
    console.log("action",action);
    console.log("user constant",userConstants);
    switch (action.type) {
        case userConstants.GETGISTS_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETGISTS_SUCCESS:
            console.log("success");
            return {
                gists: action.gists
            };
        case userConstants.GETGISTS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}