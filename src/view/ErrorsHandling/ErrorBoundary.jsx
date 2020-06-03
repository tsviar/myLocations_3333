import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { error: error };
    }

    // Update state so the next render will show the fallback UI.
    componentDidCatch(error, errorInfo) {
        console.log('error is ', error);
        console.log('errorInfo is ', errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });


        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
    }

    render() {

        if (this.state.error) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <br />
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        ComponentStack:
                        {(this.state.errorInfo) ?
                            this.state.errorInfo.componentStack : "componentStack not available"}
                    </details>
                </div>
                // <div>
                //     Some page not working
                // </div>
            );
        }

        else {
            return this.props.children;
        }

    }

}

export default ErrorBoundary;

