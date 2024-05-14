import { Rate } from 'antd'

import './film-card.css'
import { RequestConsumer } from '../request-context/request-context'

function FilmCard({ data, changeRating }) {
  const ratingChanged = (value) => {
    changeRating(data.id, value)
  }

  const voteColor = () => {
    const rating = data.vote_average
    let className = 'vote-average '
    if (rating >= 0 && rating <= 3) {
      className += 'bad-vote'
    } else if (rating > 3 && rating <= 5) {
      className += 'ok-vote'
    } else if (rating > 5 && rating <= 7) {
      className += 'good-vote'
    } else {
      className += 'super-vote'
    }
    return className
  }

  const posterLink = `https://image.tmdb.org/t/p/w500${data.poster_path}`
  const splitOverview = data.overview.split('.')
  return (
    <li key={data.id} className="movie-column">
      <img src={posterLink} alt={`${data.title}`} className="poster_image" />
      <div className="main-content">
        <div className="cardHeader">
          <h2>{data.title}</h2>
          <div className={voteColor().toString()}>{data.vote_average.toFixed(1)}</div>
        </div>
        <p>{data.release_date}</p>
        <div className="genre">
          <RequestConsumer>
            {(genres) => {
              return data.genre_ids.map((value) => {
                const genre = genres.find((genreItem) => genreItem.id === value)
                return (
                  <p key={value} className="genreElem">
                    {genre ? genre.name : ''}
                  </p>
                )
              })
            }}
          </RequestConsumer>
        </div>
        <p className="owerview">{splitOverview[0]}</p>
        <Rate count={10} allowHalf className="rating" onChange={ratingChanged} value={data.rating} />
      </div>
    </li>
  )
}

export default FilmCard
