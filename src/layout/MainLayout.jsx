import React, { Component } from "react";
import { Link } from "react-router-dom";

class MainLayout extends Component {
  render() {
    return (
      <div id="wrapper">
        <div className="container d-flex">
          <div className="profile-bar">
            <div className="logo">
              <Link to="/">
                <img src="/assets/images/envynote.png" alt="Envy Note" />
              </Link>
            </div>
            <div className="profile-button">M</div>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MainLayout;
