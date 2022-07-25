import { combineReducers } from "redux";

const favouritesReducer = (state = [], action) => {
  if (action.type === "FAVORITE") {
    return state.concat(action.payload);
  }

  return state;
};

export const reducers = combineReducers({ favouritesReducer });
