import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button} from "reactstrap";

class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('token');
    }

    render() {
        return (
            <div>
                <h2>Logout</h2>
                <p>You have been logged out.</p>
                <Button tag={Link} to="/login">Log in again</Button>
            </div>
        );
    }
}

export default withRouter(Logout);
