import {Component} from "react";

export class Movie extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.watched ? "✔" : "✘"}</td>
            </tr>
        );
    }
}

export default Movie;
