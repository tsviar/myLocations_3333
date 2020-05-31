import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidCatch(error, info) {
        console.log('error is', error);
        this.setState(error);
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    Some page not working
                </div>
            );
        } else {
            return this.props.children;
        }
    }

}

export default ErrorBoundary;
