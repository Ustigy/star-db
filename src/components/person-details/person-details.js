import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: false
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.setState({
        loading: true
      });

      this.updatePerson();
    }
  }

  updatePerson() {
    const {personId} = this.props;
    if(!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({
          person,
          loading: false
        });
      });
  };

  render() {

    if(!this.state.person) {
      return (
        <span>
          Select a person from a list
        </span>
      );
    };

    const { id, name, gender, 
            birthYear, eyeColor } = this.state.person;

    const content = (
      <>
        <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </>
    );

    return (
      <div className="person-details card">
        {this.state.loading ? <Spinner /> : content}
      </div>
    )
  }
}
