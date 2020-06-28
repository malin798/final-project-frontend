import React from 'react'

export const Pagination = ({ page, setPage, allPages, movies, setMovies, urlFactoryFunction }) => {

  const showMoreMovies = (event) => {
    event.preventDefault()
    fetch(urlFactoryFunction(page+1))
      .then(res => res.json())
      .then(res => {
        const allMovies = movies.concat(res.results)
        setMovies(allMovies)
        setPage(page+1)
      })
  }

  return (
    <section className="pagination">
      {page < allPages &&
        <button onClick={(event) => showMoreMovies(event)}>
          Show more
        </button>
      }

      <p className="pagination-page-indicator">
        {page} / {allPages}
      </p>
    </section>
  )
}