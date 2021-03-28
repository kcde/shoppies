import React, { useEffect, useRef } from 'react';

function SearchBar(props) {
  const searchInput = useRef();

  useEffect(() => {
    searchInput.current.focus();
  });
  return (
    <div>
      <div className="bg-white py-4 px-3 shadow-sm border border-gray-300 rounded-md">
        <p className="font-medium mb-1">Movie title</p>
        <div className="input-container flex items-center border border-gray-300 rounded-md py-2 px-4 focus-within:ring focus-within:border-blue-200">
          <i className="fas fa-search pr-2"></i>
          <input
            ref={searchInput}
            type="search"
            placeholder="Search For Movies"
            className="focus:outline-none flex-auto"
            onChange={props.onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
