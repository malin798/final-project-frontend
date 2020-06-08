import React, { useState, useEffect } from 'react'
// import { ThumbnailDisplay } from './ThumbnailDisplay'

export const ThumbnailGallery = ({ thumbnailArray, thumbnailDefault }) => {

  const [selectedFilePath, setSelectedFilePath] = useState(thumbnailDefault)
   
  return (
    <>
    <div className="thumbnail-gallery">
      <img 
        className="thumbnail-gallery-display"
        src={`https://image.tmdb.org/t/p/original${selectedFilePath}`}
      >
      </img>

      <div className="thumbnail-gallery-thumbs">
      {thumbnailArray.map(item => {
        return (
    
            <img 
              style={item.file_path === selectedFilePath ? {} : {opacity: 0.4}}
              src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
              onClick={() => setSelectedFilePath(item.file_path)}
            >
            </img>
        
        )
      })}
      </div>
      </div>
    </>

    // <a href="#">
    //   <img class="big" src={thumbnailSrc}>
    //   </img>

    //   <div className="thumb">
    //     {thumbNails.map((img, index) => {
    //       thumbnailSrc = `https://image.tmdb.org/t/p/w500/${img.file_path}`
    //       return (
    //       <img 
    //         src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
    //         id={index}
    //         onClick={() => handleThumbnailSlider(img.file_path)}
    //       >
    //       </img>
    //       )            
    //     })}
    //   </div>
    // </a>
  )
}
