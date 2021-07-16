import {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({"error": false});
        axios
            .post('http://localhost:8080/api/auth/', {
                username: this.state.username,
                password: this.state.password
            })
            .then(result => {
                localStorage.setItem('token', result.data.token);
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({"error": true});
            });
    }

    render() {
        let error;
        if (this.state.error) {
            localStorage.removeItem('token');
            error = <div className="alert alert-warning" role="alert">
                Failed to log in.
            </div>;
        } else {
            error = "";
        }
        return (
            <div>
                <h2>Login</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" defaultValue="" placeholder="username"
                               onChange={(e) => this.setState({"username": e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" defaultValue="" placeholder="password"
                               onChange={(e) => this.setState({"password": e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Submit</Button>
                    </FormGroup>
                </Form>
                {error}
            </div>
        );
    }
}

export default withRouter(Login);
