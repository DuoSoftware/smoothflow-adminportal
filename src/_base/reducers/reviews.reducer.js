const initState = {
    reviews: []
};
const ReviewsReducer = (state = initState, action) => {
    switch (action.type) {

        case 'ALL_REVIEWS' :
            return {
                ...state,
                reviews: action.reviews
            };

        default:
            return state
    }
};

export default ReviewsReducer;