import * as actionTypes from "./actionTypes";

import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (username, email, password, confirmPassword, isSignUp) => {
  return async (dispatch) => {
    dispatch(authStart());
    if (isSignUp) {
      if (!username || !email || !password || !confirmPassword) {
        dispatch(authFail("Please Provide Valid Credentials."));
        setTimeout(() => {
          dispatch(authFail());
        }, 3000);
      } else if (password.length < 6) {
        dispatch(authFail("Password should be of atleast 6 characters."));
        setTimeout(() => {
          dispatch(authFail(""));
        }, 3000);
      } else if (password !== confirmPassword) {
        dispatch(authFail("Passwords do not match."));
        setTimeout(() => {
          dispatch(authFail());
        }, 3000);
      } else {
        try {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt7v3kUYonmcmbxZvIgV9MIDmN4G8xq_s",
            { email, password, returnSecureToken: true }
          );
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(authSuccess(response.data.idToken));
        } catch (error) {
          dispatch(authFail("Email exists. Please Login."));
          setTimeout(() => {
            dispatch(authFail());
          }, 3000);
        }
      }
    } else {
      if (!email || !password) {
        dispatch(authFail("Please Provide Valid Credentials."));
        setTimeout(() => {
          dispatch(authFail());
        }, 3000);
      } else {
        try {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt7v3kUYonmcmbxZvIgV9MIDmN4G8xq_s",
            { email, password, returnSecureToken: true }
          );
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(authSuccess(response.data.idToken));
        } catch (error) {
          dispatch(authFail("Invalid Email or Password."));
          setTimeout(() => {
            dispatch(authFail());
          }, 3000);
        }
      }
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), expirationTime * 1000);
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};
