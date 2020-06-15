import React from 'react'

export const IMDBRatingPlugin = ({ imdbId, title, rating }) => {
  return (
    <div
      class="imdbRatingPlugin"
      data-title={imdbId}
      data-style="p2"
    >


      {rating !== 0 &&
        <p>
          {rating}/10 ⭐
        </p>
      }

    </div>
  )
}

/*
      <div className="imdb-logo">
        <a
          href={`https://www.imdb.com/title/${imdbId}/?ref_=plg_rt_1`}
          target="_blank"
          rel="noopener noreferrer"
        >

          <img
            src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png"
            alt={`${title} on IMDb`}
          />
        </a>
      </div>*/