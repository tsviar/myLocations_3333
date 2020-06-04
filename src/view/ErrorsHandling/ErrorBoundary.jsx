import React, { Component } from 'react';
import main_palete_theme from '../../style.lib/PalleteStyles';
import { makeStyles, styled } from '@material-ui/core/styles';

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
                <MainBox>
                    <h3 style={{
                        whiteSpace: 'pre-wrap',
                        color: `${main_palete_theme.palette.error.main}`,
                    }} >

                        Something went wrong.</h3>
                    <br />
                    <details style={{
                        whiteSpace: 'pre-wrap',
                        color: `${main_palete_theme.palette.error.main}`,
                    }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        ComponentStack:
                        {(this.state.errorInfo) ?
                            this.state.errorInfo.componentStack : "componentStack not available"}
                    </details>
                </MainBox >
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

const MainBox = styled('div')({

    height: '100%',
    minHeight: '33rem',

    minWidth: '94vw',

    padding: '2rem 0.5rem 0 0.5rem',

    margin: 'auto',
    //marginLeft: '1px', //0,
    //marginRight: '1rem',

    '@media all and (min-width: 550px)': {
        minWidth: '30vw',

        padding: '10rem 2rem 0 0.5rem',
    },



    '@media all and (min-width: 700px)': {
        minWidth: '39vw',

        margin: 'auto',
        // padding: '10rem 0 0 1rem',
        padding: '10rem 0.5rem 0 0.5rem',

    },
});