import {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';

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
            fetch(`/${this.props.match.params.id}`)
                .then(
                    (result) => {
                        if (result.ok) {
                            return result.json().then(value => this.setState({movie: value}));
                        } else {
                            this.props.history.push('/new');
                        }
                    }
                );
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

        const url = movie.id ? '/' + movie.id : '/';
        const method = movie.id ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then(
            (result) => {
                if (result.ok) {
                    this.props.history.push('/')
                } else {
                    window.alert("Error!");
                    console.log(result);
                }
            }
        );
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
                        <Label for="watched">Watched</Label>
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
