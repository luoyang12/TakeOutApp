import React from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter,Switch} from 'react-router-dom';
//import {Provider} from 'react-redux';
import './index.css';
import App from './App';
//import RootComponent from './components/RootComponent';
import registerServiceWorker from './registerServiceWorker';
import MineComponent from "./components/MineComponent";
import OrderComponent from "./components/OrderComponent";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ShopScreen from "./components/ShopScreen";
import ConfirmScreen from "./components/ConfirmScreen";
import AdminScreen from "./components/AdminScreen";

ReactDOM.render(

        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/order' component={OrderComponent}/>
                <Route path='/mine' component={MineComponent}/>
                <Route path='/login' component={LoginScreen}/>
                <Route path='/register' component={RegisterScreen}/>
                <Route exact path='/confirm' component={ConfirmScreen}/>
                <Route path={'/admin'} component={AdminScreen}/>
                <Route exact path='/:number' component={ShopScreen}/>
            </Switch>
        </BrowserRouter>

    , document.getElementById('root'));
registerServiceWorker();
