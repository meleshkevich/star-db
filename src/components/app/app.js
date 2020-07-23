import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details/item-details';

import './app.css';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';  
import {SwapiServiceProvider} from '../swapi-service-context';
import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

export default class App extends Component {

  swapiService = new DummySwapiService();


  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService: new DummySwapiService()
  };
  
  onServiceChange = () => {
     this.setState( ({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?  
      DummySwapiService : SwapiService;
       
        return {
          swapiService: new Service()
        };
     });
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

    const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.state.swapiService;

    const personDetails = (
      <ItemDetails 
      itemId= {11}
      getData= { getPerson }
      getImageUrl= {getPersonImage}>
      <Record field= 'gender' label= 'Gender'/>
      <Record field= 'eyeColor' label= 'Eye Color'/>
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails 
      itemId= {5}
      getData= { getStarship } 
      getImageUrl= {getStarshipImage}>
      <Record field= 'model' label= 'Model'/>
      <Record field= 'length' label= 'Length'/>
      <Record field= 'cost_in_credits' label= 'Cost'/> 
      
      </ItemDetails>  
    );

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value= {this.state.swapiService}> 
          <div className="stardb-app">
            <Header onServiceChange= {this.onServiceChange} />

            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={9} />

            <PersonList/>
  
            <StarshipList/>

            <PlanetList/>
            

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}


 