import React, { Component } from "react";
import { getMovies, getMovie } from "../Services/fakeMovieService";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import { paginate } from "../utils/paginate";
import { getGenres } from "../Services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery:"",
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  deleteMovie = (id) => {
    let movie = getMovie(id);
    let index = this.state.movies.indexOf(movie);
    let movies = this.state.movies;
    movies.splice(index, 1);
    this.setState(movies);
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChnage = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre,searchQuery:"", currentPage: 1 });
  };
  handleSearch=query=>{
    this.setState({searchQuery:query, selectedGenre: "", currentPage: 1})
  }
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData=()=>{
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre,
      searchQuery
    } = this.state;
    let filtered = allMovies
    if(searchQuery)
    filtered=allMovies.filter(m=> m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    else if(selectedGenre && selectedGenre._id)
    filtered= allMovies.filter((m) => m.genre._id === selectedGenre._id)
      
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  const movies = paginate(sorted, currentPage, pageSize);
  return {totalCount: filtered.length, data:movies}
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery
    } = this.state;
   const {totalCount, data:movies}=this.getPagedData()
    if (count === 0)
      return <div className="text-danger">No movies are in database</div>;
    return (
      <div className="container mt-5 border border-primary">
        <div className="row">
          <div className="col-2 mt-2">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            <Link to="/movies/new" className="btn btn-primary" style={{margin:20}}
            > New Movie </Link>
            <div>{totalCount} movies found</div>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.deleteMovie}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChnage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
