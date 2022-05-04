import React from "react";
import {Container, Row, Button} from "react-bootstrap";

var FA = require('react-fontawesome')


function MovieList(props) {
    const movieClicked = movie => event => {
        props.movieClicked(movie);
    }
    const addMovie = () => {
        props.addClicked()

    }
    const editClicked = movie => event => {
        props.editClicked(movie)

    }
    const deleteClicked = movie => event => {
        //delete movie


        fetch(`${process.env.REACT_APP_BASE_URL}api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },


        }).then(res => props.deleteClicked(movie))
            .catch(error => console.error('error', error))

    }

    return (

        <Container>
            <Row>
                 {props.movies.map(movie => {
                return <div key={movie.id} className="movie-item">
                    <h3 onClick={movieClicked(movie)}> {movie.title}</h3>
                    <FA name="edit" onClick={editClicked(movie)}/>
                    <FA name="trash" onClick={deleteClicked(movie)}/>

                </div>
            })}
            <Button variant={"outline-primary"} onClick={addMovie}>Add Movie</Button>
            </Row>


        </Container>
    )
}

export default MovieList