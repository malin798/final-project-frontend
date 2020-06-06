import React, { useEffect } from 'react'

export const Errormessage = ({ errormessage }) => {

  useEffect(() => {

  }, [errormessage])
  return (
    <span className="error-message">
      {errormessage}
    </span>
  )
}