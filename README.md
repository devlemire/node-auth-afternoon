<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we'll continue to use `passport`, but instead use the `GitHub` strategy this time. We'll use the same `Default App` from the mini project earlier and modify it to accept the `GitHub` strategy. We'll also expose you to some practice of having to read online documentation. 

## Setup

* Fork and clone this repository.
* `cd` into the project directory.
* Run `npm install` to get the provided dependencies.

## Step 1

### Summary

In this step, we'll modify the `Default App` on `manage.auth0.com` to accept the `GitHub` strategy.

### Instructions

* Go to `manage.auth0.com` and login to the account you created in the mini project from earlier.
* Using the left navigation bar, click on `connections` and then click on `social`.
* Turn on the `GitHub` slider.
* Under `Permissions` select `read:user`.
* At the top of the same modal, click on `Clients`.
* Turn on the slider for the `Default App`.

## Step 2

### Summary 

In this step, we'll use npm to get the required passport dependencies.

### Instructions

* Install and save `passport` and `passport-auth0`.

### Solution

<details>

<summary> <code> NPM Install </code> </summary>

```
npm install --save passport passport-auth0
```

</details>

## Step 3

### Summary

In this step, we'll create a `config.js` and `strategy.js` file. `config.js` will be responsible for storing our client's `id`, `domain`, and `secret`. We'll use `.gitignore` on this file so GitHub can't see it. `strategy.js` will be responsible for creating and exporting a `new Auth0Strategy` that uses the values from `config.js`.

### Instructions

* Create a `config.js`.
* Open `config.js`.
* Use `module.exports` to export an object with a `domain`, `clientID`, and `clientSecret` property.
  * The values of these properties should equal the values on `manage.auth0.com` for `Default App`.
* Add `config.js` to `.gitignore`.
* Create a `strategy.js`.
* Open `strategy.js`.
* Require `passport-auth0` in a `Auth0Strategy` variable.
* Require `config.js`.
* Use `module.exports` to export a `new Auth0Strategy`.
  * The values for `domain`, `clientID`, and `clientSecret` should be taken from `config.js`.

<details>

<summary> Detailed Instructions </summary>

<br />



</details>

### Solution

<details>

<summary> <code> config.js </code> </summary>

```js
module.exports = {
  domain:       '...',
  clientID:     '...',
  clientSecret: '...',
};
```

</details>

<details>

<summary> <code> strategy.js </code> </summary>

```js
const Auth0Strategy = require('passport-auth0');
const config = require(`${__dirname}/config.js`);
const { domain, clientID, clientSecret } = config;

module.exports = new Auth0Strategy({
   domain:       domain,
   clientID:     clientID,
   clientSecret: clientSecret,
   callbackURL:  '/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);
```

</details>

## Step 3

### Summary

In this step, we'll require `strategy.js`, configure the app to use sessions, initialize passport, configure passport to use sessions, and have passport use our strategy from `strategy.js`.

### Instructions

* Open `index.js`.
* Require `passport` in a variable called passport.
* Require `strategy.js` in a variable called strategy.
* Configure the app to use sessions. 
  * Hint: `secret`, `resave`, and `saveUninitialized`.
* Initialize `passport`.
* Configure `passport` to use sessions.
* Configure `passport` to use our strategy from `strategy.js`.

### Solution

<details>

<summary> <code> index.js </code> </summary>

```js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require(`${__dirname}/strategy.js`);

const app = express();
app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
```

</details>

## Step 4

### Summary

In this step, we'll configure passport's `serializeUser` and `deserializeUser` methods.

### Instructions

* Open `index.js`.
* Call `passport.serializeUser`.
  * Pass in a function as the first argument.
  * The function should have two parameters: `user` and `done`. 
  * The function should call `done` and with an object that only has the `clientID`, `email`, `name`, and `followers_url` from `user._json` as the first arugment.
* Call `passport.deserializeUser`.
  * Pass in a function as the first argument.
  * The function should have two parameters: `obj` and `done`.
  * The functions should just call `done` and pass in `obj` as the first argument.

<details>

<summary> Detailed Instructions </summary>

<br />



</details>

### Solution

<details>

<summary> <code> index.js </code> </summary>

```js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require(`${__dirname}/strategy.js`);

const app = express();
app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser( (user, done) => {
  const { _json } = user;
  done(null, { clientID: _json.clientID, email: _json.email, name: _json.name, followers: _json.followers_url });
});

passport.deserializeUser( (obj, done) => {
  done(null, obj);
});

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
```

</details>

## Black Diamond

* Create a React front end that takes the array of followers and displays it in a list of `Follower` components.
  * A `Follower` component should look like a user's information card.
  * It should display a follower's `avatar_url`, `html_url`, and `login` ( aka their username ). 
* Use `express.static` to server the React front end.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>


