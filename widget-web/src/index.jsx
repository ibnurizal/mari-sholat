import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./redux/Reducer";
import App from "./App";

let rootStore = createStore(rootReducer);

ReactDOM.render(
    <Provider store={rootStore}><App /></Provider>,
    document.getElementById('root')
);
