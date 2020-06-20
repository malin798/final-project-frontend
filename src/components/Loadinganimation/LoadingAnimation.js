import React from 'react'
import Lottie from 'react-lottie'
import animationData from './21837-movie-clapper-board.json'

export const LoadingAnimation = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <section className="loading-animation">
      <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
    </section>
  )
}