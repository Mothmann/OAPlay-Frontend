import React from 'react';
import "./css/stream_popup.css"

export default function stream_popup(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  )
}
