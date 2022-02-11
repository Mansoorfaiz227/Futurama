import React, { createContext, useReducer } from 'react';

// get/set favorites in local browser storage
const getFavorites = favorites => {
  const result = localStorage.getItem('favorites');
  if (!result) return [];
  return JSON.parse(result);
};

const setFavorites = favorites => {
  return localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Store object
// The context object to which child components will subscribe.
// Created via the React.createContext() function
const Store = createContext();

const initialState = {
  episodes: [],
  favorites: getFavorites()
};

// reducer function
// Input: state, action
// Output: updated state object, updated localStorage
const reducer = (state, action) => {
  let favorites;
  switch (action.type) {
    case 'ADD_FAVORITE':
      favorites = [...state.favorites, action.payload];
      setFavorites(favorites);
      return { ...state, favorites };
    case 'FETCH_EPISODES':
      return { ...state, episodes: action.payload };
    case 'REMOVE_FAVORITE':
      favorites = state.favorites.filter(id => id !== action.payload);
      setFavorites(favorites);
      return { ...state, favorites };
    default:
      return state;
  }
};

// The StoreProvider stores the data for our app, and provides data to consumers.
// It encapsulates all other components in the application.
// Input: props (so we can access child components)
const StoreProvider = props => {
  // useReducer, a React Hook
  // Input: reducer (updates state based on an action), initialState
  // Output: state, dispatch
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export { Store, StoreProvider };

export default Store;
