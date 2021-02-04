import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Redux
import {Provider} from 'react-redux';
import { store } from './redux/store';

import './index.css';
import Application from './components/Application';
import reportWebVitals from './reportWebVitals';
import AppMap from 'components/Application/AppMap';

// <React.StrictMode>
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/map' component={AppMap}/>
      </Switch>
      <Application/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
