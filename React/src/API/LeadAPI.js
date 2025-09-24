import axios from 'axios';
import { BASE_URL } from '../Utils/URL';

export const leadFormAPI = async ({fullName, email, phone, age, gender, source, message}) => {
    const response = await axios.post(`${BASE_URL}/api/lead-form`, {
        fullName, email, phone, age, gender, source, message
    });
    return response.data;
};

export const leadListsAPI = async () => {
    const response = await axios.get(`${BASE_URL}/api/lead-lists`, {});
    return response.data;
};

export const leadTotalAPI = async () => {
    const response = await axios.get(`${BASE_URL}/api/total-leads`, {});
    return response.data;
};

