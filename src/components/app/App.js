/* eslint-disable import/namespace */
/* eslint-disable react/state-in-constructor */

import './App.css'
import { Component } from 'react'
import { Input, Pagination } from 'antd'
import _ from 'lodash'

import FilmList from '../film-list/film-list'
import RequestServices from '../../services/request-services'

export default class App extends Component {
  request = new RequestServices()

  state = {
    films: [],
    loading: true,
    error: false,
    input: '',
    currentPage: 1,
    mode: false,
  }

  componentDidMount() {
    this.updateMovie(1)
    this.requestMoviesDebounced = _.debounce(this.requestMovies, 1000)
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

  requestMovies = () => {
    const { input, currentPage } = this.state
    this.request.searchMovies(input, currentPage).then(this.onMoviesLoaded).catch(this.onError)
  }

  queryUpdate = (event) => {
    const query = event.target.value
    this.setState({ input: query, mode: true, loading: true })
    this.requestMoviesDebounced()
  }

  pageUpdate = (page) => {
    const { mode } = this.state
    this.setState({ currentPage: page, loading: true })
    if (mode) {
      this.requestMovies()
    } else {
      this.updateMovie()
    }
  }

  updateMovie() {
    const { currentPage } = this.state
    this.request.getAllMovies(currentPage).then(this.onMoviesLoaded).catch(this.onError)
  }

  render() {
    const { films, loading, error, input } = this.state
    return (
      <section className="search-content">
        <Input onChange={this.queryUpdate} value={input} className="input" />
        <FilmList films={films} loading={loading} error={error} />
        <Pagination defaultCurrent={1} total={100} className="pagination" onChange={this.pageUpdate} />
      </section>
    )
  }
}
