import React, { useReducer, useEffect } from 'react';
import ShoppiesContext from './shoppies-context';
import reducer from './reducer';
import localStorageAdapter from 'browserstore.js/es/adapters/localStorage';
import { createStore } from 'browserstore.js';
const store = createStore(localStorageAdapter, { namespace: 'shoppies_' });

const ShoppiesState = ({ children }) => {
  const initialState = {
    nominations: store.get('nominations') || [], //{id, name, year}
    searchResult: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    store.set('nominations', state.nominations);
  }, [state.nominations]);
  //adds
  const addNomination = (id) => {
    dispatch({
      type: 'ADD',
      payload: {
        id,
      },
    });
  };

  //remove nominations
  const removeNomination = (id) => {
    dispatch({
      type: 'REMOVE',
      payload: {
        id,
      },
    });
  };

  //add search result
  const addSearchResult = (searchResults) => {
    dispatch({
      type: 'ADD_SEARCH',
      payload: {
        data: searchResults,
      },
    });
  };

  return (
    <ShoppiesContext.Provider
      value={{
        nominationsList: state.nominations,
        searchResultsList: state.searchResult,
        addNomination,
        removeNomination,
        addSearchResult,
      }}
    >
      {children}
    </ShoppiesContext.Provider>
  );
};

export default ShoppiesState;
