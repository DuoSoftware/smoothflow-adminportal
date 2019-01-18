const activities = {
    activities: [],
    loading: false
};

const PublicReducer = (state = activities, action) => {
    switch (action.type) {
        case 'ACTIVITIES_LOADER' :
            return {
                ...state,
                loading: action.loader
            };

        case 'GET_ALL' :
            return {
                ...state,
                activities: action.activities
            };
        default :
            return state
    }
};

export default PublicReducer;