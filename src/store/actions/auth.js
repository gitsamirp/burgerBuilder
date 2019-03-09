import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: data
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBNnxJsUjtVhR6xzx1awhUEzG1r-uIWCrg";
        if (!isSignUp) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBNnxJsUjtVhR6xzx1awhUEzG1r-uIWCrg"
            
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(authSuccess()));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
    }
}
