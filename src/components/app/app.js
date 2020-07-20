import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import SwapiService from '../../services/swapi-service';

export default class App extends Component {

  swapiService = new SwapiService();


  state = {
    showRandomPlanet: true,
    hasError: false
  };
  
  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onPersonSelected = (id) => {
    this.setState({
       selectedPerson: id
    });
  };

  componentDidCatch() {
    console.log('component did catch');
    this.setState({hasError: true});
  }

  render() {

    if(this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
    <RandomPlanet /> :
    null;

    return (
      <div className="stardb-app">
        <Header />
        { planet }

        <div className="row mb2 button-row" >
          <button
            className="toggle-planet btn btn-info btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <div>
            <ErrorButton />
          </div>
           
        </div>

        <PeoplePage />
         
      </div>
    );
  }
}