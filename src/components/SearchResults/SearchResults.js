import React from 'react';

function SearchResults(props) {
  return (
    <div className="bg-white mt-5 py-4 px-4 border border-gray-300 rounded-md">
      <p className="font-semibold mb-5">
        Results {props.searchWord ? `for '${props.searchWord}' ` : ''}
      </p>
      <div className="pl-12">
        <ul className="list-disc space-y-3">
          <li>
            Rambo (1999)
            <button className="btn btn-disabled">Nominate</button>
          </li>
          <li>
            Hey Ram(2000)
            <button className="btn">Nominate</button>
          </li>

          <li>
            Ram Das Going Home(2007)
            <button className="btn">Nominate</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;
