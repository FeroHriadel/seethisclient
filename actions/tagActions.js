import { API } from '../config';



export const createTag = (authtoken, values) => {
    return fetch(`${API}/tagcreate`, {
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
        return {error: `createTag action error`}
    })
}



export const getTags = () => {
    return fetch(`${API}/gettags`)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
            return {error: `getTags action error`}
        })
}



export const getTagById = tagId => {
    return fetch(`${API}/tagbyid/${tagId}`)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
            return {error: `Error: ${JSON.stringify(err)}`}
        });
}



export const editTag = (authtoken, tagId, values) => {
    console.log('action got: ', values)

    return fetch(`${API}/tagedit/${tagId}`, {
        method: 'POST',
        headers: {
            authtoken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then(res => {
        return JSON.stringify(res);
    })
    .catch(err => {
        console.log(err);
        return {error: `editTag action error`}
    });
}



export const deleteTag = (authtoken, tagId) => {
    return fetch(`${API}/tagdelete/${tagId}`, {
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
        return {error: `deleteTag action error`}
    });
}