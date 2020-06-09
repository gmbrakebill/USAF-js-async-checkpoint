//input - file list of pokemon names (seperated by a new line) and logs each pokemon's types
//according to the pokeapi.co API

//output - Pokemon's types

//Constraints - none

//Edge Cases - pokemon name might not be in API, user error - typo
 //-----------------------------------------------------------------

//Pseudocode

const fetch = require('node-fetch');
var fs = require("fs");

//read from from
fs.readFile("input.txt", (err, data) => 
{
    //make promise to return array of content on each line
    Promise.all(data.toString().split("\n")
        .map(pokemon => 
            {
            return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.trim()}`) //fetch call for all pokemon
                                                                                // with .trim to remove white spaces
                .then(response => 
                {
                        return response.json() //return response as JSON file

                })
                .then(data => 
                    {
                    return `${pokemon}: ${data.types.map(t => t.type.name).join(", ")}` //capturing pokemon types joining with , 
                })
        }))
        .then(results => 
            {
            results.forEach((item) => //looping through to log each item
             {
                console.log(item);
            })
        })
})