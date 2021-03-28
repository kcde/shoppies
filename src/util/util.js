const getMovieList = async (searchTerm) => {
  const endpoint = `http://www.omdbapi.com/?s=${searchTerm}&apikey=85b72b38`;

  try {
    const req = await fetch(endpoint);
    const res = await req.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};

export default getMovieList;
