import {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Movies from './Movies';
import MovieEdit from './MovieEdit';
import Navbar from './Navbar';
import './axiosInterceptors';

class App extends Component {
    render() {
        const loggedIn = !!localStorage.getItem('token');
        const redirectToLogin = loggedIn ? "" : (<Redirect to='login'/>);
        return (
            <Router forceRefresh={true}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Navbar/>
                        </div>
                        <div className="col-9">
                            <Switch>
                                <Route path='/login' exact={true} render={Login}/>
                                {redirectToLogin}
                                <Route path='/logout' exact={true} component={Logout}/>
                                <Route path='/' exact={true} component={Movies}/>
                                <Route path='/:id' component={MovieEdit}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
