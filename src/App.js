import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Movies  from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/not-found';
import NavBar from './components/navbar';
import MovieForm from './components/movieForm';

class App extends Component {

  render() { 
    return (
      <React.Fragment>
        <NavBar/>
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={ Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect exact from="/" to="/movies"/>
            <Redirect to="/not-found"/>
          </Switch>
        </main>
      </React.Fragment>  
    );
  }
}

export default App;