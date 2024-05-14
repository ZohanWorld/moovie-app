/* eslint-disable import/namespace */
/* eslint-disable react/state-in-constructor */

import './App.css'
import { Component } from 'react'
import { Input, Pagination, Tabs } from 'antd'
import _ from 'lodash'

import FilmList from '../film-list/film-list'
import RequestServices from '../../services/request-services'
import { RequestProvider } from '../request-context/request-context'

export default class App extends Component {
  request = new RequestServices()

  state = {
    sessionId: null,
    films: [],
    ratedFilms: [],
    genres: [],
    loading: true,
    error: false,
    input: '',
    currentTab: '1',
    currentPage: 1,
    totalPages: 0,
    ratadePages: 0,
    mode: false,
  }

  componentDidMount() {
    this.request.createSession().then((res) => {
      this.setState({ sessionId: res.guest_session_id })
    })
    this.request.getGenres().then((res) => {
      this.setState({ genres: res.genres })
    })
    this.updateMovie(1)
    this.requestMoviesDebounced = _.debounce(this.requestMovies, 1000)
  }

  onMoviesLoaded = (movie) => {
    this.setState({ films: movie.results, loading: false, totalPages: movie.total_pages })
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

  changeTab = (key) => {
    const { sessionId } = this.state
    this.setState({ currentTab: key, loading: true, error: false })
    if (key === '2') {
      this.request
        .getRatedMovies(sessionId)
        .then((res) => this.setState({ ratedFilms: res.results, ratadePages: res.total_pages, loading: false }))
        .catch(this.onError)
    } else {
      this.setState({ loading: false })
    }
  }

  changeRating = (id, value) => {
    const { sessionId } = this.state
    this.request.addToFavourite(sessionId, id, value)
  }

  updateMovie() {
    const { currentPage } = this.state
    this.request.getAllMovies(currentPage).then(this.onMoviesLoaded).catch(this.onError)
  }

  render() {
    const { films, ratedFilms, loading, error, input, totalPages, ratadePages, currentTab, genres } = this.state
    const tabs = [
      {
        key: '1',
        label: 'Search',
        children: (
          <>
            <Input onChange={this.queryUpdate} value={input} className="input" />
            <FilmList films={films} loading={loading} error={error} changeRating={this.changeRating} />
            <Pagination defaultCurrent={1} total={totalPages} className="pagination" onChange={this.pageUpdate} />
          </>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <>
            <FilmList films={ratedFilms} loading={loading} error={error} changeRating={this.changeRating} />
            <Pagination defaultCurrent={1} total={ratadePages} className="pagination" onChange={this.pageUpdate} />
          </>
        ),
      },
    ]
    return (
      <RequestProvider value={genres}>
        <section className="search-content">
          <Tabs centered items={tabs} onChange={this.changeTab} activeKey={currentTab} />
        </section>
      </RequestProvider>
    )
  }
}
