import Home from './Component/Home';
import Login from './Component/Login';
import NotFound from './Component/NotFound';
import { Route,Switch } from 'react-router-dom';
import './App.css';

const App =()=>(<>
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/login' component={Login} />
    <Route component={NotFound}/>
  </Switch>
</>)
export default App;
