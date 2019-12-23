import React from 'react';
import GlobalStyle from './styles/global'
import Header from './components/Header'
import {HashRouter} from 'react-router-dom'
import Board from './components/LoginPage/Board';
import Routes from './Routes'
function App() {
  return ( 
    <HashRouter>
    <>
     <GlobalStyle/>
     <Routes/>
    </>
    </HashRouter>
  );
}

export default App;
