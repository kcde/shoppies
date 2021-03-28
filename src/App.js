import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Nominations from './components/Nominations/Nominations';
import Cockpit from './components/Cockpit/Cockpit';
import getMoviesList from '../src/util/util';

class App extends Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      textInput: '',
      searchResults: {},
    };
  }

  changeHandler(e) {
    this.setState({ textInput: e.target.value }, () => {
      this.search(this.state.textInput);
    });
  }

  async search(searchWord) {
    let searchResult = await getMoviesList(searchWord);
    this.setState({ searchResults: searchResult.Search });
  }

  render() {
    return (
      <div className="bg-gray-200 lg:grid lg:place-items-center h-screen">
        <div className="container mx-auto ">
          <Cockpit />
          <SearchBar value={this.state.textInput} onChange={this.changeHandler} />
          <div className="md:grid lg:grid-cols-2 lg:gap-5">
            <SearchResults searchWord={this.state.textInput} />
            <Nominations />
          </div>

          <div></div>
        </div>
      </div>
    );
  }
}

export default App;
