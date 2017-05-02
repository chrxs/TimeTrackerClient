import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({
  imageUrl,
  style,
  ...rest
}) => {
  style = {
    ...avatarStyle,
    backgroundImage: `url(${imageUrl})`,
    ...style
  }
  return (
    <div style={style} {...rest} />
  )
}

const avatarStyle = {
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#ccc',
  backgroundSize: 'cover',
  borderRadius: '1000px',
  overflow: 'hidden',
  margin: '0 auto',
  width: '50px',
  height: '50px'
}

Avatar.displayName = 'Avatar'

Avatar.propTypes = {
  imageUrl: PropTypes.string,
  style: PropTypes.object
}

Avatar.defaultProps = {
  style: {}
}

export default Avatar
