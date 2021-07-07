import logo from './logo.svg';
import './Movies.css';
import {Component} from "react";
import Movie from "./Movie";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {movies: []};
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/movie/all")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        movies: result
                    });
                },
                (error) => {
                    this.setState({
                        movies: undefined
                    });
                }
            )
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <table>
                    <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Watched</th>
                    </tr>
                    {this.state.movies.map(movie => (
                        <Movie key={movie.id} title={movie.title} watched={movie.watched}/>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Movies;
