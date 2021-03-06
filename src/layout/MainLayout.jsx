import React, { Component } from "react";
import { fetchNotebooks } from "../store/action";
import { connect } from "react-redux";
import ProfileBar from "./profileBar";
import Spinner from "../components/Spinner";

class MainLayout extends Component {
  constructor() {
    super();
    this.state = {
      isFetchingNotebooks: true
    };
  }

  componentDidMount() {
    this.props.fetchNotebooks(this.props.userId).then(() => {
      this.setState({ isFetchingNotebooks: false });
    });
  }

  render() {
    return this.state.isFetchingNotebooks ? (
      <Spinner />
    ) : (
      <div className="container d-flex">
        <ProfileBar />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    userId: user
  };
};

export default connect(mapStateToProps, {
  fetchNotebooks
})(MainLayout);
