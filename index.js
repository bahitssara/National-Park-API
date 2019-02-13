'use strict';

const apiKey ='xm7dWib3mgAwNx02nmahJCTMloclC1MJCyx5ZkLg';
const searchUrl = 'https://api.nps.gov/api/v1/parks';

//WatchForm//
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchInput = $('#input-search').val();
        const resultLimit = $('#js-max-results').val();
        getStateParks(searchInput,resultLimit);
    });
}

// Set up query params
function setQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

//Fetch State Park Results //

function getStateParks(query, resultLimit=10){ 
    const params = {
        key: apiKey,
        resultLimit,
        stateCode: query
    };

    const queryString = setQueryParams(params);
    const url = searchUrl + '?' + queryString;
    console.log(url);
    fetch(url)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            displayStateParks(responseJson)
        }) 
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
    }

//Display fetch results//
    function displayStateParks(responseJson) {
        console.log(responseJson);
        $('.results').empty();

        responseJson.data.forEach(park => {
            $('.results').append(`
            <div class="results-section">
            <li><h3>${park.fullName}</h3>
            <p>${park.description}</p>
            <a href="${park.url}">Visit My Site!</a>
            </li>
            </div>`
            )
        });
        $('.results').removeClass('hidden');      
    }



$(watchForm);


