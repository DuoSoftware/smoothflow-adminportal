import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const ReviewsService = {
    getAllReviews: () => {
        return axios.get(URLs.base + URLs.reviews.getReviewQueues)
            .then(res => {
                return res;
            })
            .catch(errres => {
                return errres;
            })
    },
    publishActivity: (file, lang, callback) => {

    }
};

export { ReviewsService }