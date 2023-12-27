import React from "react";
import Errorpage from "./errorpage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    return { error: error, errorInfo: errorInfo };
  }

  render() {
    if (this.state.hasError) {
      return <Errorpage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
