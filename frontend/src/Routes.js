import React from 'react';
import{Switch, Route, Redirect} from 'react-router'
import LoginPage from './components/LoginPage/Board'

export default props=>
    <Switch>
        <Route exact path='/' component= {LoginPage}/>
     
        
    </Switch>