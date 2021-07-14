import {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Movies from './Movies';
import MovieEdit from './MovieEdit';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Movies}/>
                    <Route path='/:id' component={MovieEdit}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
