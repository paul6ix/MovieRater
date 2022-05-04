import React, {Component} from "react";
import {Button, Form, FormText} from "react-bootstrap";


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
                'Authorization': `Token ${this.props.token}`
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
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(response => response.json())
            .then(res => this.props.updatedMovie(res))
            .catch(error => console.error('error', error))

    }

    render() {
        let isDisabled = this.state.editedMovie.title.length === 0 || this.state.editedMovie.description.length === 0
        return (

            <div>

                <Form>
                    <Form.Text variant={"primary"} >Title:</Form.Text>
                    <Form.Control required name='title' type="text" value={this.props.movie.title} onChange={this.changed}/>
                    <Form.Text>Description:</Form.Text>
                    <Form.Control as="textarea" required name='description' value={this.props.movie.description} onChange={this.changed}/> <br/>
                    {this.props.movie.id ? <Button className="m-3" disabled={isDisabled} variant={"outline-success"} type="submit" onClick={this.updateForm}>Update</Button> :
                        <Button className="m-3" variant={"outline-success"} disabled={isDisabled} type="submit" onClick={this.saveForm}>Save</Button>}

                    <Button variant={"outline-danger"} onClick={this.closeForm}>Close</Button>
                </Form>
            </div>
        )
    }
}

export default MovieForm