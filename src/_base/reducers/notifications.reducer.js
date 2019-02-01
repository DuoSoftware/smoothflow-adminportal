const notifications = {
    notifications_open : false,
    notifications: [],
    global_notif_connection : null,
    tokens: {}
};

const NotificationReducer = (state = notifications, action) => {
    switch (action.type) {
        case 'NOTIFICATION_OPEN' :
            return {
                ...state,
                'notifications_open' : action.open
            };

        case 'INJECT_NOTIFICATION' :
            // debugger
            const notifs = [...state.notifications];
            const nonewline = action.notif.replace(/\r?\n|\r/, '');
            debugger
            // const parsed = {
            //     "task_name": "Notification",
            //     "form_name" : "",
            //     "form_id" : "",
            //     "assigner" : "",
            //     "assignee" : "",
            //     "review_status": "",
            //     "raw_data": {},
            //     "description": JSON.parse(nonewline).message
            // };
            notifs.push(JSON.parse(nonewline));
            return {
                ...state,
                'notifications' : notifs
            };

        case 'GLOBAL_CONNECTION' :
            return {
                ...state,
                'global_notif_connection' : action.connection
            };

        case 'TOKENS' :
            return {
                ...state,
                'tokens' : action.tokens
            };

        default :
                return state
    }
};

export default NotificationReducer;