import React from "react";


function MovieList(props) {
   const movieClicked = movie => event => {
        props.movieClicked(movie);
    }

    return (

        <div>
            {props.movies.map(movie => {
                return <h3 onClick={movieClicked(movie)} key={movie.id}> {movie.title}</h3>
            })}

        </div>
    )
}

export default MovieList