import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./view/App";
// import App from './AppTemplate';

import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
