import {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from "axios";

class MovieEdit extends Component {

    newMovie = {
        title: '',
        watched: false
    };

    constructor(props) {
        super(props);
        this.state = {
            movie: this.newMovie
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            axios
                .get(`http://localhost:8080/api/movie/${this.props.match.params.id}`)
                .then(result => {
                    this.setState({movie: result.data})
                })
                .catch(error => {
                    console.log(error);
                    this.props.history.push('/new');
                });
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;

        let movie = {...this.state.movie};
        movie[name] = value;
        this.setState({movie: movie});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {movie} = this.state;

        const method = movie.id ? 'PUT' : 'POST';
        const url = 'http://localhost:8080/api/movie/' + (movie.id ? movie.id : '');

        axios(
            {
                method: method,
                url: url,
                data: movie
            })
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                window.alert("Error!");
                console.log(error);
            });
    }

    render() {
        const {movie} = this.state;
        const header = <h2>{movie.id ? 'Edit Movie' : 'Add Movie'}</h2>;
        return (
            <div>
                {header}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={movie.title || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="watched">Seen</Label>
                        <Input type="checkbox" name="watched" id="watched" checked={this.state.movie.watched}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Save</Button>{' '}
                        <Button tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(MovieEdit);
