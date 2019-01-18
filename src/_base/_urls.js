const URLs = {
    bot : 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/',
    botactivity : 'https://smoothbotactivitydev.plus.smoothflow.io/',
    processengine : 'https://devprocessengine.plus.smoothflow.io/',
    auth : {
        signup : 'https://dev.smoothflow.io/account/#/signup',
        signin : 'https://dev.smoothflow.io/account/#/signin',
        getUserProfile : 'https://userserviceproduction.plus.smoothflow.io/DVP/API/1.0.0.0/Myprofile',
        getUserSettings: (host, company) => {
            return 'https://' + host + '/data/' + company + '.' + host + '/dashboardData/' + company;
        }
    },
    media : {
        base : 'https://smoothmediaservicedev.plus.smoothflow.io/media/1/41',
        profile : '/apis/media/tenant/',
        upload : '/upload'
    },
    activity : {
        getAllActivities : 'TenantActivitiesService',
        saveNewActivity : 'TenantActivitiesService',
        publishNewActivity : 'activity/publish',
        uploadGoCode : 'processengine/PublishActivity',
        getTagsList : 'TenantActivitiesService/tag/list',
        getReviewQueues : 'MarketplaceReview',
        addComment: 'MarketplaceReviewComment'
    },
    integration: {
        getAllIntegrations: 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/userIntegrations',
        setupIntegration: 'https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/userIntegration',
    }
};

export default URLs;