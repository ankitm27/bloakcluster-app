import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getAllList,
    addRepo,
    getGists,
    addGists,
    getUsersGists
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    };
    return fetch(`${config.apiUrl}/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function addRepo(token, repoName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,token:token},
        body: JSON.stringify({ repoName })
    };
    return fetch(`${config.apiUrl}/favourite/add`, requestOptions).then(handleResponse)
}
function addGists(token, repoId,description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,token:token},
        body: JSON.stringify({ repoId ,description})
    };
    console.log("request options",requestOptions);
    return fetch(`${config.apiUrl}/favourite/gists/add`, requestOptions).then(handleResponse)
}

function logout() {
    localStorage.removeItem('user');
}

function getAll(token) {
    const requestOptions = {
        method: 'GET',
        headers:{'token':token}
    };
    return fetch(`${config.apiUrl}/favourite/users/list`, requestOptions).then(handleResponse);
}


function getUsersGists(token) {
    const requestOptions = {
        method: 'GET',
        headers:{'token':token}
    };
    return fetch(`${config.apiUrl}/favourite/users/gists`, requestOptions).then(handleResponse);
}

function getAllList() {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`${config.apiUrl}/favourite/list`, requestOptions).then(handleResponse);
}


function getGists() {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`${config.apiUrl}/favourite/gists`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(email,password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email,password})
    };

    return fetch(`${config.apiUrl}/users/signup`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}