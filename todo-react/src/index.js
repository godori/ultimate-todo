import React from 'react';
import ReactDOM from 'react-dom';
import './styles/SF-FontFace.css';
import './styles/reset.css';
import './styles/index.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
