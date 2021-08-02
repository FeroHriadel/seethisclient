import { API } from '../config';



export const createSpot = (authtoken, formData) => {
    return fetch(`${API}/spotcreate`, {
        method: 'POST',
        headers: {
            authtoken: authtoken,
        },
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return {error: 'createSpot action error'}
    });
}



export const getSpots = (pageNumber = 1, searchword = '', category = '', tag = '', postedBy = '', sort = '', order = '') => {
    return fetch(`${API}/getspots?pageNumber=${pageNumber}&searchword=${searchword}&category=${category}&tag=${tag}&postedBy=${postedBy}&sort=${sort}&order=${order}`)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
            return {error: 'getSpots action error'}
        });
}



export const getSpotBySlug = (slug) => {
    return fetch(`${API}/getspotbyslug?slug=${slug}`)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
            return {error: `getSpotBySlug action error`}
        });
}



export const updateSpot = (authtoken, formData) => {
    return fetch(`${API}/spotedit`, {
        method: 'POST',
        headers: {
            authtoken: authtoken,
        },
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return {error: 'updateSpot action error'}
    });
}



export const getUsersSpots = (authtoken) => {
    return fetch(`${API}/getspotsbyemail`, {
        method: 'GET',
        headers: {
            authtoken
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return {error: err};
    })
}



export const deleteSpot = (authtoken, spotId) => {
    return fetch(`${API}/deletespot/${spotId}`, {
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
        return {error: `deleteSpot action error`}
    });
}



export const getSpotsByCategory = categoryId => {
    return fetch(`${API}/spotsbycategory/${categoryId}`)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
            return {error: `getSpotsByCategory action error`}
        });
}