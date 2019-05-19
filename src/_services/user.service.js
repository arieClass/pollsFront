import config from 'config';
import { authHeader } from '../_helpers';
import Parse from 'parse';
import 'babel-polyfill'
import React from "react";

Parse.serverURL = 'http://localhost:1337/parse';

Parse.initialize("POLLS", "BLOCKCHAIN")

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};



function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    let user = Parse.User.logIn(username,password).then(user =>{
        console.log(user)
    });


    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    Parse.User.logOut();
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };



    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    //console.log(JSON.stringify(user))
    console.log(user)
     //let params = {username: user.username, password: user.password, gender: user.gender, age: '30', city: 'Ramat Gan', origin: 'Ukraine', groups: ['citizen','afeka'], secret: 'kokopoposhosho'};
       Parse.Cloud.run('createUser', user).then(res => {
           console.log(res);
       });


    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
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

async function handleResponse(response) {
    let users = await parseUsers();
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
        //console.log(data)
       //  let idx = 0;
       //  let tmp;
       //  let finalData = [];
       // for(let ids in users){
       //     let name = users[ids][0];
       //     let city = users[ids][1]
       //     let id = idx++;
       //     tmp = {username: name, city: city, id: id};
       //     finalData.push(tmp);
       // }
       //  return finalData;
        return users;
    });
}

async function parseUsers() {

     let res = await Parse.Cloud.run('getUsers');

     return res;



}