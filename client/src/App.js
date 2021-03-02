import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './component/view/LandingPage/LandingPage';
import LoginPage from './component/view/LoginPage/LoginPage';
import RegisterPage from './component/view/RegisterPage/RegisterPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
