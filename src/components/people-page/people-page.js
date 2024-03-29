import React, { Component } from 'react'
import ItemList from '../item-list'
import PersonDetails from '../person-details'

import './people-page.css'

export default class PeoplePage extends Component {
    state = {
        selectedPerson: 3
    }
    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    render() {
        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected={this.onPersonSelected} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div>
        )
    }
}