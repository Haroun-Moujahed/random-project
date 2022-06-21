import React from "react";

import "./ErrorBoundary.css";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: null, errorStack: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      ...this.state,
      errorMessage: error,
      errorStack: errorInfo,
    });
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorContainer">
          <h1>Oops.. Something went wrong!</h1>
          <div className="errorStack">
            <h2>{this.state.errorMessage?.message}</h2>
            {this.state.errorStack
              ? this.state.errorStack.componentStack
                  .split("\n")
                  .map((errorLine, index) => <h3 key={index}>{errorLine}</h3>)
              : null}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
