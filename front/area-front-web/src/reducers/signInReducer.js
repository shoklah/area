const signIn = (state = [], action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return [...state, {firebase: action.firebaseData}]
        case 'SIGN_UP':
            return state
        default:
            return state
    }
}

export default signIn