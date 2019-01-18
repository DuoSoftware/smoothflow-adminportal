import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const UserService = {
    getUserProfile: () => {
        return axios.get(URLs.auth.getUserProfile)
    },
    getUserSettings: (url) => {
        return axios.get(url)
    }
};

export { UserService }