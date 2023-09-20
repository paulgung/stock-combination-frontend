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
        collector : 'https://khtest.10jqka.com.cn/skywalking-web',
        service: 'mobileweb-training-camp-group8',
        pagePath: location.hash.replace('#', '') || '/root',
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