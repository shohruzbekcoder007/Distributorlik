import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { baseUrl } from './komponents/CEO/constants';
import App from './App';

axios.defaults.baseURL = baseUrl;

ReactDOM.render(<App />, document.getElementById('root'));

