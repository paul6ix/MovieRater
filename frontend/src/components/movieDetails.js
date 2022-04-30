import React, {Component} from "react";

let FA = require('react-fontawesome');

// const baseUrl = 'http://127.0.0.1:8000/'

class MovieDetails extends Component {

    state = {
        highlighted: -1
    }

    highlightedRate = highlight => event => {
        this.setState({highlighted: highlight})

    }
    rate = stars => event => {
        //Post ratings
        fetch(`${process.env.REACT_APP_BASE_URL}api/movies/${this.props.movie.id}/rate/`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Token bf91530303048de3a86ffe40dd987e8dce324d66'
            },
            body:JSON.stringify({'stars':stars+1})
        }).then(response => response.json())
            .then(res => this.getDetails())
            .catch(error => console.error('error', error))
    }
    getDetails = () => {
        //Get movie details
        fetch(`${process.env.REACT_APP_BASE_URL}api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Token bf91530303048de3a86ffe40dd987e8dce324d66'
            },

        }).then(response => response.json())
            .then(res => this.props.updateMovie(res))
            .catch(error => console.error('error', error))
    }



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
                        <div className='rate-div'>
                            <h2>Rate {movieDetail.title}</h2>
                            {[...Array(5)].map((event, index) => {
                                return <FA key={index} name='star'
                                           className={this.state.highlighted > index - 1 ? 'rate' : ''}
                                           onMouseLeave={this.highlightedRate(index)}
                                           onMouseEnter={this.highlightedRate(-1)}
                                           onClick={this.rate(index)}
                                />
                            })}

                        </div>
                    </div>) : null}

            </React.Fragment>
        )
    }


}

export default MovieDetails;