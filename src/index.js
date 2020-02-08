import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'; 
import './assets/base.css';
import Main from './Pages/Main';
import { Provider } from 'react-redux'; 
import * as serviceWorker from './serviceWorker';
import configureStore from './config/configureStore';
 
const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <HashRouter>
          <Component />
        </HashRouter>
      </Provider>,
      rootElement
    );
  };

  renderApp(Main); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
