import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchNotebooks, setDefaultNotebookId } from "../store/action";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";

class MainLayout extends Component {
  constructor() {
    super();
    this.state = {
      isFetchingNotebooks: true
    };
  }

  componentDidMount() {
    this.props.fetchNotebooks().then(id => {
      this.props.setDefaultNotebookId(id);
      this.setState({ isFetchingNotebooks: false });
    });
  }

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
          {this.state.isFetchingNotebooks ? <Spinner /> : this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchNotebooks, setDefaultNotebookId })(
  MainLayout
);
