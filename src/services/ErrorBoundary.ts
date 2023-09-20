import React, { Component, ReactNode } from 'react';

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
    ClientMonitor.reportFrameErrors(
      {
        collector: 'https://khtest.10jqka.com.cn/skywalking-web',
        service: 'mobileweb-training-camp-group8',
        pagePath: location.hash.replace('#', '') || '/root',
        serviceVersion: 'v1.0.0',
      },
      error,
    );
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
