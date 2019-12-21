import React from 'react';
import{Switch, Route, Redirect} from 'react-router'
import LoginPage from './src/components/LoginPage/Board/index'

export default props=>
    <Switch>
        <Route exact path='/' component= {LoginPage}/>
    </Switch>