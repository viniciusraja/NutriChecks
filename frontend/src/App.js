import React from 'react';
import GlobalStyle from './styles/global'
import Header from './components/Header'
import {HashRouter} from 'react-router-dom'
import Board from './components/LoginPage/Board';
function App() {
  return ( 
    <HashRouter>
    <>
     <GlobalStyle/>
     <Board/>
    </>
    </HashRouter>
  );
}

export default App;
