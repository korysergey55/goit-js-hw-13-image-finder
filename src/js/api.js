 
const keyPixabay = '21698474-fb36d7b3400c91ab3d227d6db';

const fetchData = (searchWord, page) => {
  const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchWord}&page=${page}&per_page=12&key=${keyPixabay}`;

  return fetch(BASE_URL)
    .then(response => response.json())
    .catch(err => alert(err));
};

export { fetchData };
 