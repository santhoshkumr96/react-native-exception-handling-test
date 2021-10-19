

import React,{useEffect ,useState} from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log("error boundary error catch" , error , errorInfo);
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
  
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <Text>
            {this.state.error && this.state.error.toString()}
            {/* && this.state.errorInfo.componentStack */}
          </Text>
        );
      }
      // Normally, just render children
      return this.props.children;
    }
  }


export default ErrorBoundary;