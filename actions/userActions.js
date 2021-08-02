import { API } from '../config';



export const signup = (authtoken) => {
    return fetch(`${API}/signup`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authtoken: authtoken
        }
    }).then(res => {
        return res.json();
    }).catch(error => {
        console.log(error);
        return {error: `Signup action error`}
    });
}



export const getUser = (authtoken) => {
    return fetch(`${API}/getuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authtoken: authtoken
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return {error: `getUser action error`}
    })
}



export const getUsers = (authtoken, pageNumber, role) => {
    return fetch(`${API}/getusers?pageNumber=${pageNumber}&role=${role}`, {
        method: 'GET',
        headers: {authtoken}
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
            return {error: `getUsers action error`}
        });
}



export const toggleUserRole = (userId, authtoken) => {
    return fetch(`${API}/toggleuserrole/${userId}`, {
        method: 'POST',
        headers: {authtoken}
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return {error: `toggleUserRole action error`}
    });
}



export const wakeServerUp = () => {
    return fetch(`${API}/wakeserverup`);
}