import React, { Component, ReactNode } from 'react';
import ClientMonitor from "skywalking-client-js";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error occurred:', error, errorInfo);

    this.setState({ hasError: true });
    ClientMonitor.reportFrameErrors( {
        collector : 'XXX',
        service: 'react-demo',
        pagePath: ' /app',
        serviceVersion: 'v1.0.0',
    },
    error,)
  }

  render() {
    if (this.state.hasError) {
      return <h1>things not good</h1>; 
    }

    return this.props.children;
  }
}

export default ErrorBoundary;