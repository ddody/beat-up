import React, { Component } from 'react';
import styles from '../styles/App.module.scss';
import NoteListComponent from './NoteListComponent';
import sounds from '../source/NoteSource';

class NotePanelCompoenent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onMouse: false
    }
  }

  onMouseDownHandler(ev) {
    this.setState({
      onMouse: true
    });
  }

  onMouseUpHandler(ev) {
    this.setState({
      onMouse: false
    });
  }

  onMouseOverHandler(ev) {
    if (ev.relatedTarget && !(ev.relatedTarget.tagName === 'UL' || ev.relatedTarget.tagName === 'LI')) {
      this.setState({
        onMouse: false
      });
    }
  }

  playNoteSound(beat) {
    const audio = new Audio(sounds[beat]);
    audio.play();
  }

  onSelectBeatLine(beat) {
    this.props.onSelectBeatLine(beat);
    this.props.onBeatListShow(true);
  }


  render() {
    return (
      <div className={styles.player} onMouseOut={this.onMouseOverHandler.bind(this)}>
        {
          Object.keys(this.props.beat).map((beat, index) => {
            return (
              <div
                key={index}
                className={styles.sample}
                onMouseDown={this.onMouseDownHandler.bind(this)}
                onMouseUp={this.onMouseUpHandler.bind(this)}
              >
                <button
                  onClick={this.onSelectBeatLine.bind(this, beat)}
                  data-event="selectBeat"
                >{beat}</button>
                <button
                  onClick={this.playNoteSound.bind(this, beat)}
                >Play</button>
                <ul className={styles[beat]}>
                  <NoteListComponent
                    nowBeat={beat}
                    nowNoteIndex={this.props.nowNoteIndex}
                    beat={this.props.beat}
                    onNoteChange={this.props.onNoteChange}
                    isMouseDown={this.state.onMouse}
                  />
                </ul>
              </div>
            );
          })
        }
      </div>
    )

  }
}

export default NotePanelCompoenent;
