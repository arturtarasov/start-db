export default class SwapiService {
    _apiBase = 'https://swapi.co/api'
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }
        const body = await res.json()
        return body
    }

    async getAllPeople() {
        const res = await this.getResource('/people/')
        return res.results.map(this._transformPerson)
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}`)
        return this._transformPerson(person)
    }

    async getAllStartsips() {
        const res = await this.getResource(`/starships/`)
        return res.results.map(this._transformStarsip);
    }

    async getAllStartsip(id) {
        const starship = await this.getResource(`/starships/${id}`)
        return this._transformStarsip(starship)
    }

    async getAllPlanets() {
        const res = await this.getResource('/planets/')
        return res.results.map(this._transformPlanet)
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`)
        console.log(this._transformPlanet(planet))
        return this._transformPlanet(planet)
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/
        return item.url.match(idRegExp)[1]
    }

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
          }
    }

    _transformStarsip = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCreadits: starship.costInCreadits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }
}