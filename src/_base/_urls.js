const _host = window.location.host;

const URLs = {
    base : _host.split('.')[1] === 'dev' || _host.substring(0, 9) == 'localhost' ? 'https://smoothbotservicesdev.plus.smoothflow.io/' : 'https://smoothbotservices.plus.smoothflow.io/',
    reviews: {
        getReviewQueues : 'DBF/API/1.0.0.0/MarketplaceReview',
        updateReviewQueueItem : 'DBF/API/1.0.0.0/MarketplaceReview'
    },
    comments: {
        addComment: 'DBF/API/1.0.0.0/MarketplaceReviewComment/' //5be11b4f75a1a624e02da587
    },
    auth : {
        signup : 'https://dev.smoothflow.io/account/#/signup',
        signin : 'https://dev.smoothflow.io/account/#/signin',
        getUserProfile : 'https://userserviceproduction.plus.smoothflow.io/DVP/API/1.0.0.0/Myprofile',
        getUserSettings: (host, company) => {
            return 'https://' + host + '/data/' + company + '.' + host + '/dashboardData/' + company;
        }
    }
};

export default URLs;