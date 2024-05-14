/* eslint-disable react/state-in-constructor */

import { Component } from 'react'
import { Alert, Spin } from 'antd'

import './film-list.css'
import FilmCard from '../film-card/film-card'

export default class FilmList extends Component {
  state = {
    get: null,
  }

  render() {
    const { get } = this.state
    console.log(get)
    const { films, loading, error, changeRating } = this.props
    console.log(films, 'Получена дата, отправляю на мапинг')
    const elements = films.map((value) => {
      return <FilmCard data={value} key={value.id} changeRating={changeRating} />
    })

    const errorContent = (
      <Alert message="Error" description="Произошла ошибка, поробуйте позже." type="error" showIcon className="error" />
    )

    const hasData = !(loading || error)

    const errorMessage = error ? errorContent : null
    const spinner = loading ? <Spin className="spinner" /> : null
    const content = hasData ? elements : null
    return (
      <ul className="film-list">
        {errorMessage}
        {spinner}
        {content}
      </ul>
    )
  }
}
