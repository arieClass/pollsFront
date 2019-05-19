import Parse from 'parse';

export async function authHeader() {


    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    let usr = await Parse.Session.current();
    let token = usr.get('sessionToken');

    //console.log(user)
    if (usr && token) {

        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}