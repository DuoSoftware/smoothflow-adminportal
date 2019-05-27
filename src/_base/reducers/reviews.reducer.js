const initState = {
    reviews: [],
    integ_reviews: []
};
const ReviewsReducer = (state = initState, action) => {
    switch (action.type) {

        case 'ALL_REVIEWS' :
            return {
                ...state,
                reviews: action.reviews
            };

        case 'INTEG_REVIEWS' :
            return {
                ...state,
                integ_reviews: action.reviews
            };

        default:
            return state
    }
};

export default ReviewsReducer;