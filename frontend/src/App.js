import './App.css';
import MovieList from "./components/movieList";
import React, {Component} from "react";
import MovieDetails from "./components/movieDetails";
import MovieForm from "./components/movieForm";
import {withCookies} from "react-cookie";
import {Col, Container, Row} from "react-bootstrap";


class App extends Component {
    state = {
        movies: [],
        selectedMovie: null,
        editedMovie: null,
        auth: this.props.cookies.get('AuthToken')
    }


    componentDidMount() {
        //checking for token
        if (this.state.auth) {
            // Fetch data
            fetch(`${process.env.REACT_APP_BASE_URL}api/movies`, {
                method: 'GET',
                headers: {'Authorization': `Token ${this.state.auth}`}
            }).then(response => response.json())
                .then(res => this.setState({movies: res}))
                .catch(error => console.error('error', error))
        } else {
            alert("Please login to access this page")
            window.location.href = '/'
        }


    }

    loadMovie = movie => {
        this.setState({selectedMovie: movie, editedMovie: null})
    }
    editedMovie = selectedMovie => {
        this.setState({editedMovie: selectedMovie})
    }
    addMovie = () => {
        this.setState({editedMovie: {title: '', description: ''}})
    }
    newMovie = movie => {
        //Loading the previous movies
        this.setState({movies: [...this.state.movies, movie]})
    }
    deletedMovie = selectedMovie => {
        //comparing deleted movie ID to list of available movie
        const movies = this.state.movies.filter(movie => movie.id !== selectedMovie.id)
        this.setState(
            {movies: movies, selectedMovie: null}
        )


    }
    close = () => {
        this.setState({editedMovie: null})
    }

    render() {

        return (
            <div className="App">
                <Row>
                    <h1> Movie Rater </h1>
                </Row>


                <Container className="Layout">
                    <Row>
                        <Col lg="8">
                            <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
                                       editClicked={this.editedMovie}
                                       addClicked={this.addMovie}

                                       deleteClicked={this.deletedMovie} token={this.state.auth}/>
                        </Col>
                        <Col md="4">
                            {this.state.editedMovie ?
                                <MovieForm movie={this.state.editedMovie} updatedMovie={this.loadMovie}
                                           newMovie={this.newMovie}
                                           closeForm={this.close} token={this.state.auth}/> :
                                <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}
                                              token={this.state.auth}/>}
                        </Col>
                    </Row>


                </Container>
            </div>
        );
    }


}

export default withCookies(App);
