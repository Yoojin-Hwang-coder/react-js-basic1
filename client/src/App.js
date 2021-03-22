import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './component/view/LandingPage/LandingPage';
import LoginPage from './component/view/LoginPage/LoginPage';
import RegisterPage from './component/view/RegisterPage/RegisterPage';
import './App.css';
import Auth from './HOC/auth';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
