import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const ActivitiesService = {
    saveNewActivity: (newActivity) => {
        newActivity.date = new Date();
        return axios({
            method: 'POST',
            baseUrl: URLs.activity.base,
            url: URLs.activity.base + URLs.activity.saveNewActivity,
            data: newActivity
        })
    }
};

export { ActivitiesService }