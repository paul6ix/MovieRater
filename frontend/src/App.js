import './App.css';
import MovieList from "./components/movieList";
import React, {Component} from "react";
import MovieDetails from "./components/movieDetails";

const baseUrl = 'http://127.0.0.1:8000/'

class App extends Component {
    state = {
        movies: [],
        selectedMovie: null
    }


    componentDidMount() {
        // Fetch data
        fetch(baseUrl + 'api/movies', {
            method: 'GET',
            headers: {'Authorization': 'Token bf91530303048de3a86ffe40dd987e8dce324d66'}
        }).then(response => response.json())
            .then(res => this.setState({movies: res}))
            .catch(error => console.error('error', error))
    }

    movieClicked = movie => {
        this.setState({selectedMovie: movie})
    }

    render() {

        return (
            <div className="App">
                <h1> Movie Rater </h1>

                <div className="Layout">
                    <MovieList movies={this.state.movies} movieClicked={this.movieClicked}/>
                    <MovieDetails movie={this.state.selectedMovie}/>
                </div>
            </div>
        );
    }


}

export default App;
