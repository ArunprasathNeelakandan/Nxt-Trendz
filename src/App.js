import {Switch, Route} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Products from './Components/Products'
import Cart from './Components/Cart'
import NotFound from './Components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/cart" component={Cart} />
    <Route component={NotFound} />
  </Switch>
)
 
export default App