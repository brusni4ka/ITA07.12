import React, { Component } from "react";

interface ErrorBoundaryState {
  hasError: false;
}
export default class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    return hasError ? <p>Something went wrong!</p> : this.props.children;
  }
}
