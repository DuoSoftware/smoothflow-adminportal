export const User = user => ({
    category: 'AUTH',
    type: 'AUTH',
    user
});

export const SignIn = issignedin => ({
    category: 'AUTH',
    type: 'SIGNIN',
    issignedin
});

export const SignOut = user => ({
    category: 'AUTH',
    type: 'SIGNOUT',
    user
});
