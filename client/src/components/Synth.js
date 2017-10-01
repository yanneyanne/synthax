import React, { Component } from 'react'
import { connect } from 'react-redux'
import ActionCreators from '../actions/'
import { Link } from 'react-router-dom'
import AdaptiveSynth from '../lib/synthesizer'
import Keys from './Keys'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'

class Synth extends Component {

  componentDidMount() {
    // params injected via react-router, dispatch injected via connect
    const {dispatch, params} = this.props.match
    const {accessToken, refreshToken} = params
    this.props.setTokens({accessToken, refreshToken})
    this.props.setMe()
    this.props.setCurrentSong()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    AdaptiveSynth.adapt(this.props.currentTrack)
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentTrack != this.props.currentTrack)
      AdaptiveSynth.adapt(this.props.currentTrack)
  }

  handleKeyDown(e) {
    //play a middle 'C' for the duration of an 8th note
    if (this.props.downedKeys.includes(e.keyCode)) {
      return
    }
    this.props.synthKeyDownAction(e.keyCode)
    AdaptiveSynth.playTone(e.keyCode)
  }

  handleKeyUp(e) {
    //play a middle 'C' for the duration of an 8th note
    let idx = this.props.downedKeys.indexOf(e.keyCode)
    if (idx != -1) {
      AdaptiveSynth.stopTone(e.keyCode)
      this.props.synthKeyUpAction(e.keyCode)
    }
  }

  render() {
    return (
      <div>
        <h2>Now Playing: {this.props.currentTrack.name} - {this.props.currentTrack.artist}</h2>
        <Keys />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.spotify.accessToken,
    displayName: state.spotify.user.display_name,
    currentTrack: state.spotify.currentTrack,
    downedKeys: state.synth.get('downedKeys')
  }
}

export default connect(mapStateToProps, ActionCreators)(Synth)
