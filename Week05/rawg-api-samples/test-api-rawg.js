// To use environmental variables through process.env, 
// run the program in terminal specifying an env-file:
//
// node --env-file=.env test-api-rawg.js
//
// '.env' is a text file containing the key token, such as:
//
// RAWG_API_KEY=XXXXXXXXXXXXXXXXXXXXXXX
//
// RAWG_API_KEY is the env variable name.
// The dot prefix of '.env' indicates that the file is
// hidden and should be included in .gitignore file.

let requestOptions = {
  //method: 'GET',
  headers : {"Host": "api.rawg.io"},
};

// This function gets the game object from the RAWG API.
// Parameters: None
// Returns: A promise that resolves to the JSON object.
function getObjAPI() {
  const url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;
  return fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      return Promise.reject(new Error("HTTP error " + response.status));
    }
    return response;
  })
  .then(response => response.json())
}

// Get the game object from the API and print a list of game names.
getObjAPI()
  .then(obj => console.log(obj.results.map(game => game.name)))
  .catch(error => console.log('Error:', error.message));
