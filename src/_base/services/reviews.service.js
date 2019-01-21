import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const ReviewsService = {
    getAllReviews: () => {
        return axios.get(URLs.base + URLs.reviews.getReviewQueues)
    },
    publishActivity: (file, lang, callback) => {

    }
};

export { ReviewsService }