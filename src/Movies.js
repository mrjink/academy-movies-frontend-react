import './Movies.css';
import {Component} from "react";
import Movie from "./Movie";

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
        fetch("/all")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        error: "",
                        movies: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                        movies: undefined
                    });
                }
            )
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
                        <th>Watched</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.movies.map(movie => (
                        <Movie updateMovies={this.updateMovies} movie={movie}/>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Movies;
