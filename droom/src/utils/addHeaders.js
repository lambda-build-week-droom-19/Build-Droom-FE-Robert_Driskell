import axios from 'axios';

export function addHeaders (id){
    const token = JSON.parse(localStorage.getItem('userToken'));

    return axios.create({
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
             id: id
        }
    })
}