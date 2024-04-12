"use strict";

const api_key = 'cf71cac131e64006963c7567cf2c7e58';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

const fetchDataFromServer = function(url,callback,optionalParam){
    fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
}

export{imageBaseURL,api_key,fetchDataFromServer};