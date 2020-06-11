import React, { useState, useEffect } from 'react'

export const Review = ({review, index}) => {

  const [visible, setVisible] = useState(true) 

  useEffect(() => {
    if (review.content.length > 2000) {
      setVisible(false)
    }
  }, [])
  

  return (
    <section className="review-container">
      <div className={`review ${visible ? "show" : "hide"}`}>
        {review.content}
      </div> 
      {!visible &&
          <a 
            className="show-more-less-link"
            onClick={() => setVisible(true)}>
            &#40;Read more&#41;
          </a>
      }
        {review.content.length > 2000 && visible &&
        <a onClick={() => setVisible(false)}>
          &#40;Show less&#41;
        </a>
      }
      <div className="author">
        - {review.author} <span>&#40;The MovieDB User&#41;</span>
      </div>  
    </section>   
  )
}
