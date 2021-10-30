import * as actionTypes from "./actions/actionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        error: null,
        loading: false
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null
      };

    default:
      return state;
  }
};
export default reducer;
