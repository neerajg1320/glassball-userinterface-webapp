import axios from 'axios'

export const getUrlContentsAsync = url => {
    return new Promise( resolve => {
        axios.get(url)
        .then(response => {
            // console.log(response.data)
            resolve(response.data)
        })
    })
}