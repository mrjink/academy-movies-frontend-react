import {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

export class Movie extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.remove = this.remove.bind(this);
    }

    toggle(movie) {
        fetch(`/watched/${movie.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(
            () => {
                this.props.updateMovies();
            },
            (error) => {
                console.log(error);
            });
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
                () => {
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
