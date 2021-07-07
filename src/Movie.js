import {Component} from "react";

export class Movie extends Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    remove(movie) {
        if (window.confirm('Are you sure you want to delete "' + movie.title + '"?'))
            fetch(`/delete/${movie.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(
                (result) => {
                    this.props.updateMovies();
                },
                (error) => {
                    console.log(error);
                });
    }

    toggle(movie) {
        fetch(`/watched/${movie.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(
            (result) => {
                this.props.updateMovies();
            },
            (error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <tr>
                <td>{this.props.movie.title}</td>
                <td onClick={() => this.toggle(this.props.movie)}>{this.props.movie.watched ? "✔" : "✘"}</td>
                <td onClick={() => this.remove(this.props.movie)}>🗑</td>
            </tr>
        );
    }
}

export default Movie;
