import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

// This function "ReactDOM.render()" puts some react component on the page
// It takes 2 args, first is the component instance, second some DOM element we will attach component to
// Usually we will grab DOM element using getElementByID()
ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
