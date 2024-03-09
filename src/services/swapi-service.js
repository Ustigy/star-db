export default class SwapiService {

  _apiBase = 'https://swapi.tech/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results;
  }

  async getPerson(id) {
    const res = await this.getResource(`/people/${id}/`);
    console.log(res.result.properties);
    return res.result.properties;
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }

  async getPlanet(id) {
    const res = await this.getResource(`/planets/${id}/`);
    console.log(res.result.properties);
    return res.result.properties;
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }

  async getStarship(id) {
    const res = await this.getResource(`/starships/${id}/`);
    console.log(res.result.properties);
    return res.result.properties;
  }

  _transformPlanet(planet) {
    return {
        id,
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter
    }
  }


}
