export const SIGNUP = 'SIGNUP'

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAE9mfWKGuQ6DSLoB-H2_GeasdkCmQEwLs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        const resData = await response.json();
        console.log(resData);

        if (!response.ok) {
            throw new Error('Something wrent wong');
        }


        dispatch({ type: SIGNUP });
    };
};