/* eslint-disable class-methods-use-this */
export default class RequestServices {
  get_options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWQ0NjY0OWQxZTI4NTAyOWZiZmMzY2U5NTc5NDk4YSIsInN1YiI6IjY2MWNmYmM5NGNhNjc2MDE4NzFjOWViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Jyt_eGqheDP5jgLgnPvtebObSjenhnmtz7fOIcEEGk',
    },
  }

  _base = 'https://api.themoviedb.org/3/'

  async getData(url) {
    try {
      const res = await fetch(`${this._base}${url}`, this.get_options)
      if (!res.ok) {
        throw new Error('New error recieved!')
      }
      return await res.json()
    } catch (e) {
      console.log(e.message)
    }
    return null
  }

  async postData(url, options) {
    try {
      const res = await fetch(`${this._base}${url}`, options)
      if (!res.ok) {
        throw new Error('New error recieved!')
      }
      return await res.json()
    } catch (e) {
      console.log(e.message)
    }
    return null
  }

  async getAllMovies(page) {
    const res = await this.getData(`movie/popular?language=en-US&page=${page}`)
    return res
  }

  async searchMovies(query, page = 1) {
    const res = await this.getData(`search/movie?query=${query}&page=${page}`)
    return res
  }

  async createSession() {
    const res = await this.getData('authentication/guest_session/new')
    return res
  }

  async getRatedMovies(sessionId) {
    const res = await this.getData(`guest_session/${sessionId}/rated/movies`)
    return res
  }

  async getGenres() {
    const res = await this.getData('genre/movie/list')
    return res
  }

  async addToFavourite(sessionId, movieId, value) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWQ0NjY0OWQxZTI4NTAyOWZiZmMzY2U5NTc5NDk4YSIsInN1YiI6IjY2MWNmYmM5NGNhNjc2MDE4NzFjOWViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Jyt_eGqheDP5jgLgnPvtebObSjenhnmtz7fOIcEEGk',
      },
      body: `{"value":${value}}`,
    }
    const res = await this.postData(`movie/${movieId}/rating?guest_session_id=${sessionId}`, options)
    return res
  }
}
