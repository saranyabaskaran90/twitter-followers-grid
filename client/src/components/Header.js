import React from 'react';
import logo from '../logo.png';
import Dropdown from 'react-bootstrap/Dropdown';

function Header(props) {
  return (
    <header className="app-header">
      <div className="row">
        <div className="col-8">
          <h1>
            <img className="logo" src={logo} alt="Twitter Logo" />
            Twitter Followers
      </h1>
        </div>
        <div className="col-4">
          <div className="row rightCnt align-items-center">
            <div className="col-1">
              <i className="fa fa-bell-o"></i>
            </div>
            <div className="col-2">
              <img class="rounded-circle" src={props.user.photos[0].value} alt={props.user.displayName} />
            </div>
            <div className="col-9">
              <Dropdown>
                <Dropdown.Toggle variant="default" id="username">
                  {props.user.displayName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={props.logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;