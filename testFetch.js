const fetch = require('node-fetch');

const API_KEY = "d82f39370e0c78a52dd62ef11e7bbbe3";
const BASE = "https://api.themoviedb.org/3";

async function test() {
  const url = `${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results ? data.results.length : 'no results');
}

test();
