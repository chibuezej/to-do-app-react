import React from 'react'
import { PropTypes } from 'prop-types'


export const Button = ({color, text, onClick}) => {
   

    const buttonStyle = {
        backgroundColor : color
    }
   
  return (
    <button 
    onClick={onClick}
    style={buttonStyle}
     className='btn'>{text}
     </button>
  )
}
Button.defaultProps = {
    color: 'steelblue',
}
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}