import { Component } from "react";
import { withRouter } from "react-router-dom";

class ErrorBoundary extends Component {
  redirectHandler() {
    this.props.history.replace("/");
    window.location.reload();
  }

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      this.redirectHandler();
      return;
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
