#!/usr/bin/env node

const request = require("request");

// Get the movie Id from command line argument
const movieId = process.argv[2];

// Check if movie Id is provided
if (!movieId) {
  console.log("Movie ID absent: Usage ./file <movieId>");
  process.exit(1);
}

// Make a variable for the url
const apiURL = `https://swapi.dev/api/films/${movieId}/`;

// Helper function to fetch character data
const fetchCharacter = (apiURL) => {
  return new Promise((resolve, reject) => {
    request(apiURL, (error, response, body) => {
      if (error) return reject(error);
      if (response.statusCode !== 200)
        return reject(`Failed to fetch character: ${response.statusCode}`);
      const characterData = JSON.parse(body);
      resolve(characterData.name);
    });
  });
};

// Make a request to the files endpoint
request(apiURL, async (error, response, body) => {
  if (error) {
    console.log("Error fetching data:", error);
    return;
  }
  if (response.statusCode != 200) {
    console.log(
      `Failed to fetch movies. Status code: ${response.statusCode} statusCode`
    );
    return;
  }

  //   Parse the JSON response
  const data = JSON.parse(body);

  //   Get the list of character URLS
  const characters = data.characters;

  //   Loop through each character URL and fetch the character data
  try {
    // Use promise.all to fetch all characters concurrently
    const characterNames = await Promise.all(characters.map(fetchCharacter));

    characterNames.forEach((name) => console.log(name));
  } catch (err) {
    console.error("Error fetching character data:", err);
  }
});
