import { API } from '../config';



export const createCategory = (authtoken, values) => {
    return fetch(`${API}/categorycreate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authtoken: authtoken
        },
        body: JSON.stringify(values)
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return {error: `createCategory action error`}
    })
}



export const getCategories = () => {
    return fetch(`${API}/getcategories`)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
            return {error: `getCategories action error`}
        })
}



export const getCategoryById = categoryId => {
    return fetch(`${API}/categorybyid/${categoryId}`)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
            return {error: `Error: ${JSON.stringify(err)}`}
        });
}



export const editCategory = (authtoken, categoryId, values) => {
    return fetch(`${API}/categoryedit/${categoryId}`, {
        method: 'POST',
        headers: {
            authtoken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return {error: `edictCategory action error`}
    });
}



export const deleteCategory = (authtoken, categoryId) => {
    return fetch(`${API}/categorydelete/${categoryId}`, {
        method: 'DELETE',
        headers: {
            authtoken
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return {error: `deleteCategory action error`}
    });
}