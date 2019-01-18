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
    myactivities: [],
    integrations: []
};
const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGNIN' :
            return {
                ...state,
                username: action.user.username,
                _id: action.user._id,
                email: {
                    contact: action.user.email.contact
                },
                is_logged_in: true
            };

        case 'SIGNOUT' :
            return {
                ...state,
                is_logged_in: false
            };

        case 'GET_MY_ACTIVITIES' :
            return {
                ...state,
                myactivities: action.activities
            };

        case 'USER_LOADER' :
            return {
                ...state,
                loading: action.loader
            };

        case 'GET_MY_INTEGRATIONS' :
            return {
                ...state,
                integrations: action.integrations
            };

        default:
            return state
    }
}

export default UserReducer;