const axios = require('axios');

axios.get('https://quotes.rest/qod.json')
  .then(response => {
    console.log(response.data.contents.quotes[0].quote);
  })
  .catch(error => {
    console.log(error);
  });