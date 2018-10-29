import React, { Component } from 'react';
import styles from '../styles/App.module.scss';

class NoteComponent extends Component {

  onClickHandler(ev) {
    const sample = ev.target.dataset.sample.split('.');
    const sampleIndex = sample[1];
    const sampleName = sample[0];
    let beatCopy = { ...this.props.beat };
    let sampleCopy = beatCopy[sampleName].slice();
    if (this.props.beat[sampleName][sampleIndex] === 'x') {
      sampleCopy[sampleIndex] = '-';
    } else {
      sampleCopy[sampleIndex] = 'x';
    }
    beatCopy[sampleName] = sampleCopy;
    this.props.onNoteChange(beatCopy);
  }

  onMouseOverHandler(ev) {
    if (this.props.isMouseDown) {
      this.onClickHandler(ev);
    }
  }

  onMouseDrag(ev) {
    ev.preventDefault();
  }

  render() { // 네모칸도 뺀다
    return (
      this.props.beat[this.props.nowBeat].map((beat, index) => {
        return (
          <li
            key={index}
            className={
              this.props.beat[this.props.nowBeat][index] === 'x' ?
                this.props.nowNoteIndex === index ? `${styles.note} ${styles.active} ${styles.on}` : `${styles.note} ${styles.active}`
                : this.props.nowNoteIndex === index ? `${styles.note} ${styles.on}` : styles.note
            }
            onMouseDown={this.onClickHandler.bind(this)}
            onMouseEnter={this.onMouseOverHandler.bind(this)}
            onDragStart={this.onMouseDrag.bind(this)}
            data-sample={`${this.props.nowBeat}.${index}`}
          >
          </li>
        )
      })
    )
  }
}

export default NoteComponent;
