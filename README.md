## Twitter Followers Application

This is a React-Redux application, that uses Twitter Authentication and fetch the Followers details of the signed in user. 

In this application, we have used node.js, express.js with passport.js in backend.

##### Passport.js and react-twitter-auth npm package - is used for authentication with Twitter Auth API

##### For getting the twitter followers API, used twitter npm package

##### Added the consumer key and secret in the twitter.config.js which will be removed after sometime. (Can get this key by registering your application in https://developer.twitter.com/

### How to start the application

Download the application :

git clone https://github.com/saranyabaskaran90/twitter-followers-grid.git

### To Start Backend server:

cd twitter-followers-grid

npm install

npm start


### To Start Client

cd client

npm install

npm start


### Note: Hit http://127.0.0.1:3000 instead of localhost:3000 as twitter does not support localhost:3000 for auth callback URLs 