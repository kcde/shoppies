import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Nominations from './components/Nominations/Nominations';
import Cockpit from './components/Cockpit/Cockpit';
import { uniqWith, isEqual } from 'lodash';
import axios from 'axios';
import localStorageAdapter from 'browserstore.js/es/adapters/localStorage';
import { createStore } from 'browserstore.js';
const store = createStore(localStorageAdapter, { namespace: 'shoppies_' });

class App extends Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      textInput: '',
      searchResults: [
        //{
        //  id: 234,
        //  name: 'Rambo',
        //  year: '1999',
        //},
        // {
        //   id: 534,
        //   name: 'Harry Potter',
        //   year: '2006',
        // },
        // {
        //   id: 344,
        //   name: 'Transporter',
        //   year: '2009',
        // },
        // {
        //   id: 789,
        //   name: 'Avatar',
        //   year: '2001',
        //},
      ],
      nominations: store.get('nominations') || [],
      errorMessage: '',
    };
  }

  changeHandler(e) {
    console.log('changed');
    this.setState({ textInput: e.target.value }, () => {
      if (this.state.textInput === '') {
        this.setState({ errorMessage: '', searchResults: [] });
      }
    });
  }

  nominateDisableHandler = (id) => {
    const searchResults = this.state.searchResults.filter((result) => result.id === id);
    const nominations = this.state.nominations.filter((result) => result.id === id);
    return searchResults.length === nominations.length;
  };

  nominateHandler = (id) => {
    const searchResults = this.state.searchResults.filter((result) => result.id === id);
    const newNominations = [...this.state.nominations, ...searchResults];
    this.setState({ nominations: newNominations }, () => {
      store.set('nominations', this.state.nominations);
    });
  };

  nominateRemoveHandler = (id) => {
    const nominations = this.state.nominations.filter((result) => result.id !== id);
    const newNominations = [...nominations];
    this.setState({ nominations: newNominations }, () => {
      store.set('nominations', this.state.nominations);
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.textInput !== this.state.textInput && this.state.textInput !== '') {
      axios
        .get(`http://www.omdbapi.com/?s=${this.state.textInput}&apikey=85b72b38`)
        .then((response) => {
          if (response.data.hasOwnProperty('Error')) {
            this.setState({ searchResults: [], errorMessage: response.data.Error });
          } else {
            //? using loadash to get unique results from the api. some seach return duplicate values!!
            const uniqueResults = uniqWith(response.data.Search, isEqual);
            const responseSearchResults = uniqueResults.slice(0, 5).map((result) => {
              return {
                title: result.Title,
                year: result.Year,
                id: result.imdbID,
              };
            });

            this.setState({ searchResults: responseSearchResults, errorMessage: '' });
          }
        });
    }
  }

  render() {
    return (
      <div className="">
        <div className="container mx-auto ">
          <Cockpit />
          <SearchBar value={this.state.textInput} onChange={this.changeHandler} />
          <div className=" flex flex-col md:flex-row md:justify-between md:space-x-3">
            <SearchResults
              searchWord={this.state.textInput}
              nominationsNumber={this.state.nominations.length}
              searchResult={this.state.searchResults}
              disable={this.nominateDisableHandler}
              clickNominate={this.nominateHandler}
              searchError={this.state.errorMessage}
            />
            <Nominations
              Nominations={this.state.nominations}
              removeNominate={this.nominateRemoveHandler}
            />
          </div>

          <div></div>
        </div>
      </div>
    );
  }
}

export default App;
