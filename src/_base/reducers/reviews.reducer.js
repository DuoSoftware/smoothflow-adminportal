const initState = {
    reviews: []
};
const ReviewsReducer = (state = initState, action) => {
    switch (action.type) {

        case 'ALL_REDUCERS' :
            return {
                ...state,
                reviews: action.reviews
            };

        default:
            return state
    }
}

export default ReviewsReducer;