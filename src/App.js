import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Header from './elements/Header'
import Home from './pages/Home'
import Movimentacoes from './pages/Movimentacoes'





function App() {

   
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Route path='/' exact component={Home}/>
        <Route path='/movimentacoes/:data' component={Movimentacoes} />
      </div>
    </BrowserRouter>
    
    
  )
}

export default App

