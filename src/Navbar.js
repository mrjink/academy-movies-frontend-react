import {Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        const loggedIn = !!localStorage.getItem('token');
        if (loggedIn)
            return (
                <ul>
                    <li>
                        <Link to="/">View movies</Link>
                    </li>
                    <li>
                        <Link to="/new">Add movie</Link>
                    </li>
                    <li>
                        <Link to="/logout">Log out</Link>
                    </li>
                </ul>
            );
        return (
            <p>You are not logged in.</p>
        );
    }
}

export default Navbar;
