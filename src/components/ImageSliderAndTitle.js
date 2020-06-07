import React, { useEffect, useState } from 'react'
import { ImageSlider } from './ImageSlider'


const API_KEY = process.env.REACT_APP_API_KEY

export const ImageSliderAndTitle = ({ fetchtitle, fetchlink }) => {

  return (
    <>
      <h4>{fetchtitle}</h4>
      < ImageSlider fetchlink={fetchlink} />
    </>
  )
}