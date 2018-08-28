/**
 * fetch 封装
 * get, post
 */

export function get(url) {
    return new Promise((resolve, reject) => {
        fetch(`api/${url}`, {
            method: 'GET'
        }).then(res => {
            return res.json()
        }).then(data => resolve(data))
    })
}

export function post(url, obj, option) {
    return new Promise((resolve, reject) => {
        fetch(`api/${url}`, {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `model=${JSON.stringify(obj)}`,
            ...option
        }).then(res => {
            return res.json()
        }).then(data => resolve(data))
    })
}
