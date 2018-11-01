import React, { Component } from 'react';
import styles from '../styles/App.module.scss';
import NoteListComponent from './NoteListComponent';
import sounds from '../source/NoteSource';

class NotePanelCompoenent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onMouse: false
    };
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
    const audio = new Audio(this.props.soundList[beat]);
    audio.play();
  }

  onSelectBeatLine(beat) {
    this.playNoteSound(beat);
    this.props.onSelectBeatLine(beat);
    this.props.onBeatListShow(true);
  }

  render() {
    return (
      <div className={styles.player} onMouseOut={this.onMouseOverHandler.bind(this)}>
        {
          this.props.beat.map((beat, index) => {
            const _beat = Object.keys(beat)[0];
            return (
              <div
                key={index}
                className={this.props.nowSelectedBeatLine === _beat ? `${styles.activeLine} ${styles.sample} panelWrap` : `${styles.sample} panelWrap`}
                onMouseDown={this.onMouseDownHandler.bind(this)}
                onMouseUp={this.onMouseUpHandler.bind(this)}
              >
                <button
                  className="panerSelectButton"
                  onClick={this.onSelectBeatLine.bind(this, _beat)}
                  data-event="selectBeat"
                >{_beat}</button>
                <ul className={styles[_beat]}>
                  <NoteListComponent
                    nowBeat={_beat}
                    nowNoteIndex={this.props.nowNoteIndex}
                    nowLineIndex={index}
                    beat={this.props.beat}
                    beatCopy={this.props.beat[index]}
                    onNoteChange={this.props.onNoteChange}
                    isMouseDown={this.state.onMouse}
                  />
                </ul>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default NotePanelCompoenent;
