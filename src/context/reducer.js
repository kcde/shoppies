const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        nominations: state.nominations.concat(
          state.searchResult.filter((res) => res.id === action.payload.id)
        ),
      };
    case 'REMOVE':
      return {
        ...state,
        nominations: state.nominations.filter((nom) => nom.id !== action.payload.id),
      };
    case 'ADD_SEARCH':
      return {
        ...state,
        searchResult: action.payload.data,
      };
    default:
      return state;
  }
};

export default reducer;
