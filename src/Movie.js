import {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import axios from "axios";

export class Movie extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.remove = this.remove.bind(this);
    }

    toggle(movie) {
        axios
            .put(`http://localhost:8080/api/movie/watched/${movie.id}`, {})
            .then(() => {
                this.props.updateMovies();
            })
            .catch(error => {
                console.log(error);
            });
    }

    remove(movie) {
        if (window.confirm('Are you sure you want to delete "' + movie.title + '"?'))
            axios
                .delete(`http://localhost:8080/api/movie/delete/${movie.id}`)
                .then(() => {
                    this.props.updateMovies();
                })
                .catch(error => {
                    console.log(error);
                });
    }

    render() {
        return (
            <tr>
                <td>{this.props.movie.title}</td>
                <td>
                    <Button color={this.props.movie.watched ? "success" : "secondary"}
                            onClick={() => this.toggle(this.props.movie)}>{this.props.movie.watched ? "✔" : "✘"}</Button>
                </td>
                <td>
                    <Button color="warning" tag={Link} to={"/" + this.props.movie.id}>🖉</Button>
                </td>
                <td>
                    <Button color="danger" onClick={() => this.remove(this.props.movie)}>🗑</Button>
                </td>
            </tr>
        );
    }
}

export default Movie;
