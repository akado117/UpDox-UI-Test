import React from 'react'
import { onKeyDown} from '../lib/ADAHelper'

const Provider = ({provider = {}, className,onClick})=> {

  const buttonAttribs = onClick? {
    onClick: onClick,
    onKeyDown: onKeyDown,
    role: 'button',
    tabIndex: '0'
  } : {}

  return (<div className={`card provider-container ${className}`} {...buttonAttribs}>
    <div className="left-text">
      <p className="large-text">{`${provider.last_name}, ${provider.first_name}`}</p>
      <p>{provider.email_address || ''}</p>
    </div>
    <div className="right-text">
      <p className="large-text">{provider.specialty || ''}</p>
      <p>{provider.practice_name}</p>
    </div>
  </div>)
}

export default Provider
