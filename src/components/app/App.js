/* eslint-disable import/namespace */
/* eslint-disable react/state-in-constructor */
import './App.css'
import { Component } from 'react'

import RequestServices from '../../services/request-services'
import FilmList from '../film-list/film-list'

export default class App extends Component {
  request = new RequestServices()

  constructor() {
    super()
    this.updateMovie()
  }

  state = {
    films: [],
    loading: true,
    error: false,
  }

  onMoviesLoaded = (movie) => {
    this.setState({ films: movie, loading: false })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateMovie() {
    this.request.getAllMovies().then(this.onMoviesLoaded).catch(this.onError)
  }

  render() {
    const { films, loading, error } = this.state
    return (
      <section>
        <FilmList films={films} loading={loading} error={error} />
      </section>
    )
  }
}
