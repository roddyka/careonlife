import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { LastLocationProvider } from 'react-router-last-location';

import './styles/settings/colors.css';
import './styles/tools/fonts.css';
import './styles/generic/reset.css';
import './styles/generic/content.css';

import App from './App';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DetailNurse from './components/DetailNurse';
import PartnerPage from './components/PartnerPage/index';
import UserPage from './components/UserPage/index';
import LoginPage from './components/LoginPage/index';
import HeaderMain from './components/HeaderMain/index';
import ProfiilePage from './components/ProfilePage/index';
import AboutPage from './components/AboutPage/index';


ReactDOM.render(
    <>
    <BrowserRouter>
    <LastLocationProvider>
    <HeaderMain />
      <div className="wrapper">
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/detail/:id" component={DetailNurse}/>
            <Route path="/register/user" component={UserPage}/>
            <Route path="/register/partner" component={PartnerPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/profile" component={ProfiilePage}/>
            <Route path="/about" component={AboutPage}/>
        </Switch>
      </div>
    </LastLocationProvider>
    </BrowserRouter>
    </>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
