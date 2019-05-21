import axios from 'axios';

export const axiosWithAuth = (id) => {
    const token = localStorage.getItem('token');
    return axios.create({
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
            id,
        }
    });
};