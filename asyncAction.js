const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: true,
  data: [],
  error: "",
};

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

function userReq() {
  return {
    type: FETCH_USER_REQUESTED,
  };
}

function userSuccess(users) {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
}

function userFailed(error) {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(userReq());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(userSuccess(users));
      })
      .catch((error) => {
        dispatch(userFailed(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
