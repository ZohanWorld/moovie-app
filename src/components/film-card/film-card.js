import './film-card.css'

function FilmCard({ data }) {
  const posterLink = `https://image.tmdb.org/t/p/w500${data.poster_path}`
  const splitOverview = data.overview.split('.')
  return (
    <li key={data.id} className="movie-column">
      <img src={posterLink} alt={`${data.title}`} className="poster_image" />
      <div className="main-content">
        <h2>{data.title}</h2>
        <p>{data.release_date}</p>
        <div className="genre">
          <p>drama</p>
          <p>comdey</p>
        </div>
        <p>{splitOverview[0]}</p>
      </div>
    </li>
  )
}

export default FilmCard
