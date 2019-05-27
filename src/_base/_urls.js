const URLs_dev = {
    base: 'https://pjrfiq43nl.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
    reviews: {
        getReviewQueues : 'MarketplaceReviews',
        updateReviewQueueItem : 'MarketplaceReview',
        integrations: {
            base_ : 'https://6p5bodtp9c.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
            marketplaceIntegrationReviews: 'MarketplaceIntegrationReviews',
            getIntegrationById: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Dev/connections/',
            updateIntegration: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Dev/connections/update'
        }
    },
    media: {
        base: 'https://smoothmediaservicedev.plus.smoothflow.io',
        download: '/media/1/103/download'
    },
    comments: {
        addComment: 'DBF/API/1.0.0.0/MarketplaceReviewComment/' //5be11b4f75a1a624e02da587
    },
    activity: {
        base: 'https://zr24946hcg.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/',
        saveNewActivity: 'TenantActivitiesService'
    },
    auth: {
        signup : 'https://dev.smoothflow.io/account/#/signup',
        signin : 'https://dev.smoothflow.io/account/#/signin',
        getUserProfile : 'https://ml9oskczql.execute-api.us-east-1.amazonaws.com/Dev/DBF/API/1.0.0.0/me',
        getUserSettings: (host, company) => {
            return 'https://' + host + '/data/' + company + '.' + host + '/dashboardData/' + company;
        }
    }
};
const URLs_prod = {
    base: 'https://pjrfiq43nl.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
    reviews: {
        getReviewQueues : 'MarketplaceReviews',
        updateReviewQueueItem : 'MarketplaceReview',
        integrations: {
            base_ : 'https://6p5bodtp9c.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
            marketplaceIntegrationReviews: 'MarketplaceIntegrationReviews',
            getIntegrationById: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Prod/connections/',
            updateIntegration: 'https://s0zppm1pyg.execute-api.us-east-1.amazonaws.com/Prod/connections/update'
        }
    },
    media: {
        base: 'https://smoothmediaservice.plus.smoothflow.io',
        download: '/media/1/103/download'
    },
    comments: {
        addComment: 'DBF/API/1.0.0.0/MarketplaceReviewComment/' //5be11b4f75a1a624e02da587
    },
    activity: {
        base: 'https://zr24946hcg.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/',
        saveNewActivity: 'TenantActivitiesService'
    },
    auth: {
        signup : 'https://smoothflow.io/account/#/signup',
        signin : 'https://smoothflow.io/account/#/signin',
        getUserProfile : 'https://ml9oskczql.execute-api.us-east-1.amazonaws.com/Prod/DBF/API/1.0.0.0/me',
        getUserSettings: (host, company) => {
            return 'https://' + host + '/data/' + company + '.' + host + '/dashboardData/' + company;
        }
    }
};

let URLs = null;
if (window.location.hostname == "localhost" ||
    window.location.hostname == "dev.smoothflow.io" ||
    window.location.hostname == "smoothflow-dev.s3-website-us-east-1.amazonaws.com" ||
    window.location.hostname == "d35ie0dhlww2mo.cloudfront.net") {
    URLs = URLs_dev;
} else if (window.location.hostname == "smoothflow.io" ||
    window.location.hostname == "prod.smoothflow.io" ||
    window.location.hostname == "d3ored5mvntnxi.cloudfront.net") {
    URLs = URLs_prod;
}

export default URLs;