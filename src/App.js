import React, { useState, useEffect, useContext } from 'react';
import ShoppiesContext from './context/shoppies-context';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Nominations from './components/Nominations/Nominations';
import Cockpit from './components/Cockpit/Cockpit';
import { uniqWith, isEqual } from 'lodash';
import axios from 'axios';

const App = () => {
  const { nominationsList, addSearchResult, searchResultsList } = useContext(ShoppiesContext);
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const changeHandler = (e) => {
    console.log('changed');
    setText(e.target.value);
    if (text === '') {
      setErrorMessage('');
      addSearchResult([]);
    }
  };
  const nominateDisableHandler = (id) => {
    const newSearchResults = searchResultsList.filter((result) => result.id === id);
    const nominations = nominationsList.filter((result) => result.id === id);
    return (newSearchResults.length = nominations.length);
  };

  useEffect(() => {
    setErrorMessage('');
    if (text.trim() !== '') {
      axios
        .get(`http://www.omdbapi.com/?s=${text}&apikey=${process.env.REACT_APP_API_KEY}`)
        .then((response) => {
          if (response.data.hasOwnProperty('Error')) {
            addSearchResult([]);
            setErrorMessage(response.data.Error);
          } else {
            //? using loadash to get unique results from the api. some seach return duplicate values!!
            const uniqueResults = uniqWith(response.data.Search, isEqual);
            const responseSearchResults = uniqueResults.slice(0, 5).map((result) => {
              return {
                title: result.Title,
                year: result.Year,
                id: result.imdbID,
                poster: result.Poster,
              };
            });

            addSearchResult(responseSearchResults);
          }
        });
    }
    //eslint-disable-next-line
  }, [text]);

  return (
    <div>
      <div className="container mx-auto ">
        <Cockpit />
        <SearchBar value={text} onChange={(e) => changeHandler(e)} />
        <div className=" flex flex-col md:flex-row md:justify-between md:space-x-3">
          <SearchResults
            searchWord={text}
            disable={nominateDisableHandler}
            searchError={errorMessage}
          />
          <Nominations />
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default App;
