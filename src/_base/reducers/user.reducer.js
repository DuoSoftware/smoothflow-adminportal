const initState = {
    Active: true,
    company: 0,
    created_at: "2018-08-02T06:58:54.121Z",
    email: {
        contact: "kasun.w@duosoftware.com",
        type: "email",
        display: "kasun.w@duosoftware.com",
        verified: false
    },
    tenant: 1,
    updated_at: "2018-08-02T06:58:54.121Z",
    user_meta: {role: "admin"},
    username: "kasun.w@duosoftware.com",
    _id: "5b62abaeb0eca10001a26ee9",
    is_logged_in: false,
    reviews: [],
    sesuser: null
};
const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGNIN' :
            return {
                ...state,
                is_logged_in: action.issignedin
            };

        case 'AUTH' :
            return {
                ...state,
                sesuser: action.user
            };

        case 'SIGNOUT' :
            return {
                ...state,
                is_logged_in: false
            };

        case 'USER_LOADER' :
            return {
                ...state,
                loading: action.loader
            };

        case 'GET_MY_REVIEWS' :
            return {
                ...state,
                reviews: action.reviews
            };

        default:
            return state
    }
}

export default UserReducer;