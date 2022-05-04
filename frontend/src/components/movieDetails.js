import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";

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
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({'stars': stars + 1})
        }).then(response => response.json())
            .then(res => this.getDetails())
            .catch(error => console.error('error', error))
    }
    getDetails = () => {
        //Get movie details
        fetch(`${process.env.REACT_APP_BASE_URL}api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
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
                    (<Row>
                        <Col>
                            <h3 className="text">{movieDetail.title}</h3>
                            <FA name='star' className={movieDetail.avg_ratings > 0 ? 'stared' : ''}/>
                            <FA name='star' className={movieDetail.avg_ratings > 1 ? 'stared' : ''}/>
                            <FA name='star' className={movieDetail.avg_ratings > 2 ? 'stared' : ''}/>
                            <FA name='star' className={movieDetail.avg_ratings > 3 ? 'stared' : ''}/>

                            ({movieDetail.get_ratings})
                            <hr/>
                            <p>{movieDetail.description}</p>
                        </Col>
                        <Row >
                            <Col>
                                <hr/>
                                <h4>Rate Movie</h4>
                                {[...Array(5)].map((event, index) => {
                                    return <FA key={index} name='star'
                                               className={this.state.highlighted > index - 1 ? 'rate' : ''}
                                               onMouseLeave={this.highlightedRate(index)}
                                               onMouseEnter={this.highlightedRate(-1)}
                                               onClick={this.rate(index)}
                                    />
                                })}
                            </Col>
                        </Row>
                    </Row>) : null}

            </React.Fragment>
        )
    }


}

export default MovieDetails;