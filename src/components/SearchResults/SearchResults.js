import React, { useContext } from 'react';
import ShoppiesContext from '../../context/shoppies-context';
import Button from '../Button/Button';
import Alert from '../Alert/Alert';
import Poster from '../Poster/Poster';

function SearchResults(props) {
  const { nominationsList, addNomination, searchResultsList } = useContext(ShoppiesContext);
  return (
    <div className="bg-white mt-5 py-4 px-4 border border-gray-300 rounded-md md:flex-1 md:self-start">
      <p className="font-semibold mb-5">
        Results {props.searchWord ? `for '${props.searchWord}' ` : ''}
      </p>

      {props.searchError ? (
        <Alert message="please refine your search" reason={props.searchError} type="Error" />
      ) : null}
      <div className="pl-12">
        <ul className="list-none space-y-3 divide-y divide-gray-200">
          {searchResultsList.map((result) => (
            <li key={result.id} className="py-4 flex items-center">
              <Poster src={result.poster} alt={result.title} />
              <div>
                {result.title} ({result.year})
                <Button
                  disable={nominationsList.length === 5 || props.disable(result.id)}
                  clicked={() => addNomination(result.id)}
                >
                  Nominate
                </Button>
              </div>
            </li>
          ))}

          {/* //? disable props should receive a comparism between the SearchResults and nominations to see if the same key is present in both. with will result in either returning true or false*/}
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;
