import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.scss'

const Avatar = ({
  imageUrl,
  style,
  className,
  ...rest
}) => {
  style = {
    backgroundImage: `url(${imageUrl})`,
    ...style
  }
  const classNames = [styles.Avatar]
  if (className) {
    classNames.push(className)
  }
  return (
    <div className={classNames.join(' ')} style={style} {...rest} />
  )
}

Avatar.displayName = 'Avatar'

Avatar.propTypes = {
  imageUrl: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

Avatar.defaultProps = {
  imageUrl: 'default_image',
  style: {}
}

export default Avatar
