export const OpenNotifications = open => ({
    category: 'NOTIFICATION',
    type: 'NOTIFICATION_OPEN',
    open
});

export const InjectNotification = notif => ({
    category: 'NOTIFICATION',
    type: 'INJECT_NOTIFICATION',
    notif
});

export const OpenGlobalNotifConnection = connection => ({
    category: 'NOTIFICATION',
    type: 'GLOBAL_CONNECTION',
    connection
});

export const Tokens = tokens => ({
    category: 'NOTIFICATION',
    type: 'TOKENS',
    tokens
});