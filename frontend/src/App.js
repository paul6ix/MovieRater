import './App.css';
import MovieList from "./components/movieList";
import React, {Component} from "react";
import MovieDetails from "./components/movieDetails";


class App extends Component {
    state = {
        movies: [],
        selectedMovie: null
    }


    componentDidMount() {
        // Fetch data
        fetch(`${process.env.REACT_APP_BASE_URL}api/movies`, {
            method: 'GET',
            headers: {'Authorization': 'Token bf91530303048de3a86ffe40dd987e8dce324d66'}
        }).then(response => response.json())
            .then(res => this.setState({movies: res}))
            .catch(error => console.error('error', error))
    }

    loadMovie = movie => {
        this.setState({selectedMovie: movie})
    }

    render() {

        return (
            <div className="App">
                <h1> Movie Rater </h1>

                <div className="Layout">
                    <MovieList movies={this.state.movies} movieClicked={this.loadMovie}/>
                    <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
                </div>
            </div>
        );
    }


}

export default App;
