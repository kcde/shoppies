import React from 'react';
import Button from '../Button/Button';
import Alert from '../Alert/Alert';

function SearchResults(props) {
  return (
    <div className="bg-white mt-5 py-4 px-4 border border-gray-300 rounded-md md:flex-1 md:self-start">
      <p className="font-semibold mb-5">
        Results {props.searchWord ? `for '${props.searchWord}' ` : ''}
      </p>

      {props.searchError ? (
        <Alert message="please refine your search" reason={props.searchError} type="Error" />
      ) : null}
      <div className="pl-12">
        <ul className="list-disc space-y-3 divide-y divide-gray-200">
          {props.searchResult.map((result) => (
            <li key={result.id} className="py-4">
              {result.title} ({result.year})
              <Button
                disable={props.nominationsNumber === 5 || props.disable(result.id)}
                clicked={() => props.clickNominate(result.id)}
              >
                Nominate
              </Button>
            </li>
          ))}

          {/* //? disable props should receive a comparism between the SearchResults and nominations to see if the same key is present in both. with will result in either returning true or false*/}
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;
