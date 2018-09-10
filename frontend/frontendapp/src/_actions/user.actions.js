import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { browserHistory } from 'react-router'

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    getAllList,
    addRepo,
    getGists,
    addGists,
    getUsersGists
};

function login(username, password) {
    return dispatch => {
        dispatch(request({username}));

        userService.login(username, password)
            .then(
                user => {
                if (user.success) {
                    dispatch(success());
                    localStorage.setItem('user', JSON.stringify(user.data.token));
                    history.push('/')
                } else {
                    dispatch(alertActions.error(user.message.toString()));
                }
            },
                error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}

function logout() {
    userService.logout();
    return {type: userConstants.LOGOUT};
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user.username, user.password)
            .then(
                user => {
                if (user.success) {
                    dispatch(success());
                    history.push('/login');
                } else {
                    dispatch(alertActions.error(user.message.toString()));
                }
            },
                error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(user) {
        return {type: userConstants.REGISTER_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }
}

function getAll() {
    const token = getToken();
    return dispatch => {
        dispatch(request());

        userService.getAll(token)
            .then(
                users => {
                //console.log("user list",users);
                //    console.log("users list 1111", users.data);
                dispatch(success(users.data))
            },
                error => {
                //console.log("error",error);
                dispatch(failure(error.toString()))
            }
        );
    };

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function success(users) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}

function getUsersGists() {
    const token = getToken();
    return dispatch => {
        dispatch(request());

        userService.getUsersGists(token)
            .then(
                users => {
                dispatch(success(users.data))
            },
                error => {
                //console.log("error",error);
                dispatch(failure(error.toString()))
            }
        );
    };

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function success(users) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}

function getAllList() {
    return dispatch => {
        dispatch(request());
        userService.getAllList()
            .then(
                favourite => {
                dispatch(success(favourite.data))
                //return favourite.data;
            },
                error => {
                //console.log("error",error);
                dispatch(failure(error.toString()))
            }
        );
    };

    function request() {
        return {type: userConstants.GETALLLIST_REQUEST}
    }

    function success(list) {
        return {type: userConstants.GETALLLIST_SUCCESS, list}
    }

    function failure(error) {
        return {type: userConstants.GETALLLIST_FAILURE, error}
    }
}


function getGists() {
    return dispatch => {
        dispatch(request());
        userService.getGists()
            .then(
                gists => {
                    //console.log("gists",gists);
                    //console.log("gists data",gists.data);
                    dispatch(success(gists.data))

                },
                error => {
                dispatch(failure(error.toString()))
            }
        );
    };

    function request() {
        return {type: userConstants.GETGISTS_REQUEST}
    }

    function success(gists) {
        return {type: userConstants.GETGISTS_SUCCESS, gists}
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
        );
    };

    function request(id) {
        return {type: userConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: userConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: userConstants.DELETE_FAILURE, id, error}
    }
}

function addRepo(repoName) {
    const token = getToken();
    return dispatch => {
        dispatch(request({repoName}));

        userService.addRepo(token, repoName)
            .then(
                result => {
                dispatch(success(result));
                history.push('/');
            },
                error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(user) {
        return {type: userConstants.ADDITEM_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.ADDITEM_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.ADDITEM_FAILURE, error}
    }
}


function addGists(repoId,description) {
    const token = getToken();
    return dispatch => {
        dispatch(request({repoId}));

        userService.addGists(token, repoId,description)
            .then(
                result => {
                dispatch(success(result));
                history.push('/');
            },
                error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(user) {
        return {type: userConstants.ADDITEM_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.ADDITEM_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.ADDITEM_FAILURE, error}
    }
}


const getToken = () => {
    let token = localStorage.getItem("user");
    token = token.substring(1, token.length - 1);
    return token;
}