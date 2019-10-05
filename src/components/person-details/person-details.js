import React, { Component } from 'react'

import './person-details.css'
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'

export default class PersonDetails extends Component {

  swapiService = new SwapiService()
  state = {
    person: null,
    lodaing: false
  }
  componentDidMount() {
    this.updatePerson()
    this.setState({
      lodaing: false
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) this.updatePerson()
  }
  updatePerson() {
    this.setState({
      lodaing: true
    })
    const {personId} = this.props
    if (!personId) return
    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({person, lodaing: false})
      })
  }
  render() {
    const person = this.state.person
    const loading = this.state.lodaing
    const loadingSpinner = loading ? <Spinner /> : null
    const content = (person && !loading) ? <PersonView person={person}/> : null
    const selectPerson = (!person && !loading) ? <span>Select a person from a List</span> : null
    return (
      <div className="person-details card">
        {loadingSpinner}
        {content}
        {selectPerson}
      </div>
    )
  }
}

const PersonView = ({person}) => {
  const {id, name, gender, birthYear, eyeColor} = person
  return (
    <React.Fragment>
      <img className="person-image" alt="person-details"
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
    </React.Fragment>
  )
}
