import './App.css';
import MovieList from "./components/movieList";
import React, {Component} from "react";
import MovieDetails from "./components/movieDetails";
import MovieForm from "./components/movieForm";


class App extends Component {
    state = {
        movies: [],
        selectedMovie: null,
        editedMovie: null
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
        this.setState({selectedMovie: movie, editedMovie:null})
    }
    editedMovie = selectedMovie => {
        this.setState({editedMovie: selectedMovie})
    }
    addMovie = () => {
        this.setState({editedMovie: {title: '', description: ''}})
    }
    deletedMovie = selectedMovie => {
        //comparing deleted movie ID to list of available movie
        const movies = this.state.movies.filter(movie => movie.id !== selectedMovie.id)
        this.setState(
            {movies: movies, selectedMovie: null}
        )


    }

    render() {

        return (
            <div className="App">
                <h1> Movie Rater </h1>

                <div className="Layout">
                    <MovieList movies={this.state.movies} movieClicked={this.loadMovie} editClicked={this.editedMovie} addClicked={this.addMovie}
                               deleteClicked={this.deletedMovie}/>

                    {this.state.editedMovie ? <MovieForm movie={this.state.editedMovie}/> :
                        <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>}


                </div>
            </div>
        );
    }


}

export default App;
