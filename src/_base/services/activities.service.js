import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const ActivitiesService = {
    getReviewQueues: () => {
        return axios.get(URLs.activity.getReviewQueues)
    },
    getActivityDetailsByName: (name) => {
        // return axios.get(URLs.activity.getAllActivities + /activity/ + id)
        return axios.get(URLs.activity.getAllActivities + '/' + name)
    },
    saveNewActivity: (newActivity) => {
        newActivity.date = new Date();
        return axios.post(URLs.activity.saveNewActivity, newActivity)
    },
    getTagsList: () => {
        return axios.get(URLs.activity.getTagsList)
    },
    addComment: (comment, id) => {
        debugger
        return axios.post(URLs.activity.addComment + '/' + id, comment)
    }
};

export { ActivitiesService }