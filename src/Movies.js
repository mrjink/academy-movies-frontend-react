import {Component} from 'react';
import axios from 'axios';
import Movie from './Movie';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoaded: false, error: "", movies: []};
        this.updateMovies = this.updateMovies.bind(this);
    }

    componentDidMount() {
        this.updateMovies();
    }

    updateMovies() {
        this.setState({isLoaded: false, error: ""})
        axios
            .get("http://localhost:8080/api/movie/all")
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: "",
                    movies: result.data
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoaded: true,
                    error: error.message,
                    movies: undefined
                })
            })
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div className="App loading">
                    Loading...
                </div>
            )
        } else if (this.state.error !== "") {
            return (
                <div className="App error">
                    <header>Error occurred!</header>
                    {this.state.error}
                </div>
            )
        }
        return (
            <div className="App">
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Seen</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.movies.map(movie => (
                        <Movie key={movie.id} updateMovies={this.updateMovies} movie={movie}/>
                    ))}
                    </tbody>
                </table>
                <p>
                    <Button color="primary" tag={Link} to="/new">Add Movie</Button>
                </p>
            </div>
        );
    }
}

export default Movies;
