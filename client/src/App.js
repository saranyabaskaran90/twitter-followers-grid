import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import logo from './logo.png';
import { ACTIONS } from './constants';
import Header from './components/Header';
import Followers from './components/Followers';
import Navigation from './components/Navigation';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

import axios from 'axios';
import store from "./store";
import TwitterLogin from 'react-twitter-auth'; // login module


class App extends React.Component {

  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: '', screenNameInput: '' };
  }
  onSuccess = (response) => {
    console.log(response)

    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      console.log(user)
      if (token) {
        this.fetchFollowers(user.username);
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
  };

  makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  sortFollowersList = (key) => {
    const users = this.props.users;
    users.sort((a, b) => {
      const lowerCaseA = a[key].toLowerCase();
      const lowerCaseB = b[key].toLowerCase();
      return lowerCaseA === lowerCaseB ? 0 : lowerCaseA < lowerCaseB ? -1 : 1;
    });
    store.dispatch({
      type: ACTIONS.SORT_FOLLOWERS,
      sortBy: key,
      users
    })
  }

  fetchFollowers = (screenName, cursor = -1) => {
    store.dispatch({
      type: ACTIONS.REQUEST_FOLLOWERS,
      screenName: screenName,
      isFetching: true,
      apiCounter: this.props.apiCounter + 1
    });
    const count = 20;
    let params = `screenName=${screenName}&count=${count}`;
    if (cursor) {
      params += `&cursor=${cursor}`;
    }
    axios.get(`/api/followers?${params}`).then(response => {
      store.dispatch({
        type: ACTIONS.FOLLOWERS_RECEIVED,
        users: response.data.users,
        prevCursor: response.data.previous_cursor_str,
        nextCursor: response.data.next_cursor_str,
        isFetching: false
      });
    })
  }

  navigateFollowers = (cursorKey) => {
    this.fetchFollowers(this.props.screenName, this.props[cursorKey]);
  }

  render() {
    if (!!this.state.isAuthenticated) {
      return (
        <div className="App">
          <Container className="app-container">
            <Header user={this.state.user} logoutHandler={this.logout}/>
            <div className="main">
              {(this.props.apiCounter > 0 && this.props.isFetching) &&
                <Spinner variant="primary" animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              }
              {(this.props.apiCounter > 0 && !this.props.isFetching) &&
                <Followers users={this.props.users} sortFunction={this.sortFollowersList} screenNameInput={this.props.screenName} />
              }
            </div>
            {(this.props.users && this.props.users.length > 0) &&
              <Navigation prevCursor={this.props.prevCursor} nextCursor={this.props.nextCursor} navigateFollowers={this.navigateFollowers} />
            }
          </Container>
        </div>
      );
     }

    return (
      <div className="App" >
        <Container className="app-container">
              <h1>
                <img className="logo" src={logo} alt="Twitter Logo" />
                Signin To Get Followers
              </h1>
          <div className="m-0 m-auto">
              <TwitterLogin loginUrl="http://localhost:5000/api/v1/auth/twitter"
                onFailure={this.onFailed} onSuccess={this.onSuccess}
                requestTokenUrl="http://localhost:5000/api/v1/auth/twitter/reverse" />
            </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    users: store.followersState.users,
    prevCursor: store.followersState.prevCursor,
    nextCursor: store.followersState.nextCursor,
    sortBy: store.followersState.sortBy,
    apiCounter: store.followersState.apiCounter,
    isFetching: store.followersState.isFetching,
    screenName: store.followersState.screenName
  };
}

export default connect(mapStateToProps)(App);