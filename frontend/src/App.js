import './App.css';
import MovieList from "./components/movieList";
import React, {Component} from "react";

const baseUrl = 'http://127.0.0.1:8000/'

class App extends Component {

    movies = ['Fantastic 4', 'Spiderman', 'Batman']

    state = {
        movies: []
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

    render() {
        return (
            <div className="App">
                <h1> Movie Rater </h1>
                <MovieList movies={this.state.movies}/>
            </div>
        );
    }


}

export default App;
