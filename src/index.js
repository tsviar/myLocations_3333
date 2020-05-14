import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./view/App";
// import App from './AppTemplate';

import * as serviceWorker from './serviceWorker';



const solution = () => {
    // const A = [1, 2, 3];
    //const A = [-1, -2, -10000];
    const A = [1, 2, 3, 6, 4, 1, 2, 4];

    let orderedA = [0];
    orderedA[0] = 0;
    for (let i = 1; i < A.length + 2; i++) {
        orderedA[i] = i;
    }

    //orderedA[orderedA.length] = orderedA.length ;
    console.log("A :" + A + "\n");
    console.log("Start orderedA :" + orderedA + "\n");

    for (let i = 0; i < A.length; i++) {
        console.log("A[" + i + "] =" + A[i] + "\n");
        if (A[i] > 0) {
            orderedA[A[i]] = 0;
        }

    }


    console.log("After orderedA :" + orderedA + "\n");

    for (let i = 1; i < orderedA.length; i++) {
        if (orderedA[i] > 0) {
            console.log("orderedA[" + i + "] =" + orderedA[i] + "\n");
            return orderedA[i];
        }
    }
}; //solution

var val = solution();
console.log("solution =" + val + "\n");


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
