import React, {Component} from "react";


class MovieForm extends Component {
    state = {
        editedMovie: this.props.movie
    }

    closeForm = () => {
        this.props.closeForm()
    }
    changed = event => {
        let movie = this.state.editedMovie
        movie[event.target.name] = event.target.value
        this.setState({editedMovie: movie})
    }
    saveForm = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token bf91530303048de3a86ffe40dd987e8dce324d66'
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(response => response.json())
            .then(res => this.props.newMovie(res))
            .catch(error => console.error('error', error))

    }
    updateForm = () => {
         fetch(`${process.env.REACT_APP_BASE_URL}api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token bf91530303048de3a86ffe40dd987e8dce324d66'
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(response => response.json())
            .then(res => this.props.updatedMovie(res))
            .catch(error => console.error('error', error))

    }

    render() {
        return (
            <div>

                <form>
                    <p>Title:</p>
                    <input name='title' type="text" value={this.props.movie.title} onChange={this.changed}/>
                    <p>Description:</p>
                    <textarea name='description' value={this.props.movie.description} onChange={this.changed}/> <br/>
                    {this.props.movie.id ? <button type="submit" onClick={this.updateForm}>Update</button> :
                        <button type="submit" onClick={this.saveForm}>Save</button>}

                    <button onClick={this.closeForm}>Close</button>
                </form>
            </div>
        )
    }
}

export default MovieForm