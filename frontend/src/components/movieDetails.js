import React, {Component} from "react";

let FA = require('react-fontawesome');


class MovieDetails extends Component {

    render() {
        const movieDetail = this.props.movie
        return (
            <React.Fragment>
                {movieDetail ?
                    (<div>
                        <h3>{movieDetail.title}</h3>
                        <FA name='star' className={movieDetail.avg_ratings > 0 ? 'stared' : ''}/>
                        <FA name='star' className={movieDetail.avg_ratings > 1 ? 'stared' : ''}/>
                        <FA name='star' className={movieDetail.avg_ratings > 2 ? 'stared' : ''}/>
                        <FA name='star' className={movieDetail.avg_ratings > 3 ? 'stared' : ''}/>
                        ({movieDetail.get_ratings})
                        <p>{movieDetail.description}</p>
                    </div>) : null}
            </React.Fragment>
        )
    }


}

export default MovieDetails;