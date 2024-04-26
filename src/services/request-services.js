/* eslint-disable class-methods-use-this */
export default class RequestServices {
  options = {
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
      const res = await fetch(`${this._base}${url}`, this.options)
      if (!res.ok) {
        throw new Error('New error recieved!')
      }
      return await res.json()
    } catch (e) {
      console.log(e)
    }
    return null
  }

  async getAllMovies() {
    const res = await this.getData('discover/movie?page=1&sort_by=popularity.desc')
    return res.results
  }
}