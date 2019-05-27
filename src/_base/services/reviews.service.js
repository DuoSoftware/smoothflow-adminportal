import axios from "axios/index";
import URLs from "../_urls";
import fs from 'fs';

const ReviewsService = {
    getAllReviews: () => {
        return axios.get(URLs.reviews.integrations.base_ + URLs.reviews.integrations.marketplaceIntegrationReviews)
    },
    getIntegrationReviews: () => {
        return axios.get(URLs.reviews.integrations.base_ + URLs.reviews.integrations.marketplaceIntegrationReviews)
    },
    getIntegrationById: (id) => {
        return axios.get(URLs.reviews.integrations.getIntegrationById + id)
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
    directPublish: (file, lang, callback) => {
        return axios.post(URLs.reviews.integrations.updateIntegration, file)
    },
    downloadActivity: (filename) => {
        return axios({
            method: 'POST',
            baseUrl: URLs.media.base,
            url: URLs.media.base + URLs.media.download,
            data: {
                "fileName" : filename
            }
        })
        .then(res => {
            return res;
        })
        .catch(errres => {
            return errres;
        })
    },
    updateReviewQueue: (id, payload) => {
        return axios.put(URLs.reviews.updateReviewQueueItem + '/' + id, payload);
    }
};

export { ReviewsService }