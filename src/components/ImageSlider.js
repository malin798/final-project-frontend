import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
<<<<<<< HEAD
    items: 7,
    slidesToSlide: 5
=======
    items: 6,
    slidesToSlide: 5 
>>>>>>> cecc6c1b1d8084952d6b9cef9bb12011028c43a4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
}

export const ImageSlider = (props) => {

  return (

    <Carousel
      swipeable={true}
      draggable={false}
      minimumTouchDrag={80}
      arrows={true}
      responsive={responsive}
      ssr={true}
      infinite={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all 1.5s ease-in-out"
    >
      {props.children}
    </Carousel >
  )
}


