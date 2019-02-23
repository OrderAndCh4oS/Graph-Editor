export function getFetch(url) {
    return fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
    });
}

export function deleteFetch(url) {
    return fetch(url, {
        method: 'delete',
        credentials: 'include',
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
    });
}

export function postFetch(url, data) {
    return fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export function putFetch(url, data) {
    return fetch(url, {
        method: 'put',
        credentials: 'include',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}