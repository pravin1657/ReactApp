import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Joi  from 'joi-browser';
import Form from './form'
import { getMovie, saveMovie } from '../Services/fakeMovieService';
import { getGenres } from '../Services/fakeGenreService';


class MovieForm extends Form {
state = {data:{ title:'',
genreId:'',
numberInStock:'',
dailyRentalRate:''},
genres:[],
errors:{}
 } 
params=useParams()
navigate=useNavigate()

schema={
    _id:Joi.string(),
    title:Joi.string().required().label("Title"),
    genreId:Joi.string().required().label("Genre"),
    numberInStock:Joi.string().required().min(0).max(100).label("Number in Stock"),
    dailyRentalRate:Joi.string().required().min(0).max(10).label("Daily Rental Rate"),
}
componentDidMount(){
    const genres=getGenres();
    this.setState({genres});

    const movieId=this.params.id;
    if(movieId==="new") return;

    const movie=getMovie(movieId)
    if (!movie) return this.navigate('/movies')
    this.setState({data:this.mapToViewMode(movie)})

}
mapToViewMode(movie){
return{
    _id:movie.id,
    title:movie.title,
    genreId:movie.genre_id,
    numberInStock:movie.numberInStock,
    dailyRentalRate:movie.dailyRentalRate
}
}
doSubmit=()=>{
    saveMovie(this.state.data)
    this.navigate('/movies')
}


    render() { 
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit} >
                    {this.renderInput("title","Title")}
                    {this.renderSelect("genreId","Genre",this.state.genres)}
                    {this.renderInput("numberInStock","Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate","Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}
 
export default MovieForm;