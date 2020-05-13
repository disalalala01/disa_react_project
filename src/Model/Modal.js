import React from 'react'
import './Modal.css'


export default class Modal extends React.Component {
  render() {
    return (
      <React.Fragment>
      <button>Open modal</button>

      <div className='modal'>
        <div className='modal-body'>
          <h1>Modal title</h1>
          <p>I am awesome modal!</p>
          <button>Close modal</button>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
