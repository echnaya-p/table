async function request(url) {
  const response = [];

  await fetch(url)
    .then(response => response.json())
    .then(json => json.forEach(obj => response.push(obj)))
    .catch(err => console.log(err));

  return response;
}

export default request;
