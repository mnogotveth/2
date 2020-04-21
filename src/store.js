import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

import fetch from "cross-fetch";

const UPDATE_MESSAGES = 'updateMessages';
const ADD_MESSAGE = 'addMessage';

const apiURL = "http://localhost:3001";

const initialState = {
  messages: []
};

export default createStore(function (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    }
    case UPDATE_MESSAGES: {
      return {
        ...state,
        messages: action.messages
      }
    }
    default: {
      return state;
    }
  }
}, applyMiddleware(thunkMiddleware));


///////////////actiion 1
export const updateMessages = (messages) => {
  return {
    type: UPDATE_MESSAGES,
    messages
  }
};

export const fetchMessages = () => {
  return (dispatch) => {
    return fetch(apiURL)
      .then(response => response.json())
      .then(response => {
        dispatch(updateMessages(response));
      })
  }
};

//////////////action 2
export const pushMessage = message => {
  return {
    type: ADD_MESSAGE,
    message
  };
};

export const sendMessage = data => {
  return dispatch => {
    return fetch(apiURL, {method: 'POST', body: JSON.stringify(data)})
      .then(() => dispatch(pushMessage(data)));
  }
};