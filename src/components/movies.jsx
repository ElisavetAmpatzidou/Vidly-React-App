import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import {getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import TableMovies from './tableMovies';
import _ from 'lodash';
import NavBar from './navbar';
import { Link } from 'react-router-dom';

class Movies extends Component {
    state = { movies : [],
            genres: [],
            currentPage: 1,
            pageSize: 4,
            sortColumn: {path :'title' , order:'asc'}
        };


    componentDidMount(){
        const genres  = [ {_id: "" , name: "allGenres" }, ...getGenres()]
        this.setState({movies : getMovies(), genres});
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter( mov => mov._id !== movie._id);
        this.setState({movies})
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handlePageChange = page => {
        this.setState({currentPage : page});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre : genre, currentPage:1});
    }

    handleSort = sortColumn => {

        this.setState({sortColumn});
    }

    getPageData = () => {
        const { pageSize, currentPage , selectedGenre, sortColumn,  movies: allMovies } = this.state;
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted , currentPage, pageSize);

        return {totalCount: filtered.length , data: movies}
    }

    render() { 
        const { pageSize, currentPage , sortColumn} = this.state;
        if (this.state.movies.length === 0 )
            return <p>There are no movies in the database</p>;
        
        const {totalCount , data: movies} = this.getPageData();
           
        
        return ( 
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                        items={this.state.genres} 
                        selectedItem = {this.state.selectedGenre} 
                        onGenreSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link to="/movies/new" className="btn btn-primary">New Movie</Link>
                    <p>Showing {totalCount} movies in the database.</p>
                    <TableMovies 
                        movies={movies} 
                        sortColumn={sortColumn} 
                        onLike={this.handleLike} 
                        onDelete={this.handleDelete} 
                        onSort={this.handleSort}
                    />
                    <Pagination 
                        itemsCount = {totalCount}
                        pageSize={this.state.pageSize} 
                        currentPage={this.state.currentPage} 
                        onPageChange={this.handlePageChange}
                    />
                </div>
           
            </div>
         );
    }
}
 
export default Movies;