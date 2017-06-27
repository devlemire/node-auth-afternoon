const express = require('express');
const session = require('express-session');
const request = require('request');

const app = express();
app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));

const GitHubRequest = {
  url: 'https://api.github.com/user/followers',
  headers: {
    'User-Agent': 'request'
  }
}

app.get('/followers', ( req, res, next ) => {
  request(GitHubRequest, ( error, response, body ) => {
    console.log('Error', error);
    // console.log('Response,', response);
    console.log('Body', body);
  });
});

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );