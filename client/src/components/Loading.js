import React, { Component } from 'react'

export class Loading extends Component {
  
  render() {
    return (
        <div id="loading" className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui small text loader">Chargement..</div>
          </div>
        </div>
    )
  }
}

export default Loading
