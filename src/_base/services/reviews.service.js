import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const ReviewsService = {
    getAllReviews: () => {
        return axios.get(URLs.base + URLs.reviews.getReviewQueues)
    },
    addComment: (comment, user) => {
        return axios({
            method: 'POST',
            baseUrl: URLs.base,
            url: URLs.base + URLs.comments.addComment + user,
            data: comment
        })
        .then(res => {
            return res;
        })
        .catch(erres => {
            return erres;
        });
    },
    publishActivity: (file, lang, callback) => {

    }
};

export { ReviewsService }