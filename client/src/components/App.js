import React, { Component } from 'react'

export default class App extends Component {
  render() {
    // Injected via react router
    const {children} = this.props
    return (
      <div>
        <h1> In app! </h1>
      </div>
    )
  }
}
