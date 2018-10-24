import React, { Component } from 'react';
import styles from '../styles/App.module.scss';
import _ from 'lodash';
import Tone from 'tone';
import kick from '../source/kick.wav';
import bass from '../source/bass.wav';
import oh from '../source/oh.wav';
import ch from '../source/ch.wav';
import snare from '../source/snare.wav';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beat: {
        kick: ['-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-'],
        bass: ['-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-'],
        oh: ['-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-'],
        ch: ['-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-'],
        snare: ['-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-']
      },
      bpm: 80
    };
  }
  // state이용

  componentDidMount() {
    const keys = new Tone.Players({
      "kick": kick,
      "bass": bass,
      "oh": oh,
      "ch": ch,
      "snare": snare,
    }, {
        "volume": 5,
        "fadeOut": "64n",
      }).toMaster();

    //the notes
    const noteNames = ["kick", "bass", "oh", "ch", "snare"];
    const loop = new Tone.Sequence((time, col) => {

      for (let i = 0; i < noteNames.length; i++) {
        let noteRef = this.refs[`${noteNames[i]}-${col}`];
        let noteRefBefore = this.refs[`${noteNames[i]}-${col - 1 === -1 ? 31 : col - 1 }`];

        if (noteRef.dataset.active === 'active') {
          noteRef.style.transform = 'matrix3d(1.4,-0.77,0.34,0,0.77,1.4,0.34,-0.001,-0.34,-0.34,0.9,0,2,2,4,1)';
        } else {
          noteRef.style.backgroundColor = '#333';
        }
        if (noteRefBefore.dataset.active === 'active') {
          noteRefBefore.style.transform = 'none';
        } else {
          noteRefBefore.style.backgroundColor = '#fff';
        }

        if (this.state.beat[noteNames[i]][col] === 'x') {
          var vel = Math.random() * 0.5 + 0.5;
          keys.get(noteNames[i]).start(time, 0, "4n", 0, vel);
        }
      }
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], "16n");
    Tone.Transport.bpm.value = this.state.bpm;
    Tone.Transport.start();
    this.loop = loop;
  }

  onStop() {
    this.loop.stop();
  }

  onPlay() {
    this.loop.start();
    Tone.Transport.start();
  }

  onPause() {
    Tone.Transport.pause();
  }

  onClickHandler(ev) {
    const sample = ev.target.dataset.sample.split('-');
    const sampleIndex = sample[1];
    const sampleName = sample[0];
    let beatCopy = { ...this.state.beat };
    let sampleCopy = beatCopy[sampleName].slice();
    if (this.state.beat[sampleName][sampleIndex] === 'x') {
      sampleCopy[sampleIndex] = '-';
    } else {
      sampleCopy[sampleIndex] = 'x';
    }
    beatCopy[sampleName] = sampleCopy;
    this.setState({
      beat: beatCopy
    });
  }

  onRangeHandler(ev) {
    console.log(ev.target.value);
    Tone.Transport.bpm.value = ev.target.value;
    this.setState({
      bpm: ev.target.value
    });
  }

  render() {
    return (
      <div className={styles.App}>
        <header>
          <h1>title</h1>
        </header>
          <div className="status-bar">
            <div className="menu-wrap">
              <button onClick={this.onPlay.bind(this)}>Play</button>
              <button onClick={this.onPause.bind(this)}>pause</button>
              <button onClick={this.onStop.bind(this)}>Stop</button>
              <button>Reset</button>
              <button>Save</button>
            </div>
            <div>
              <span>BPM: </span>
              <strong>{this.state.bpm}</strong>
              <div className="control-bar">
                <input type="range" defaultValue={this.state.bpm} min="60" max="200" onChange={this.onRangeHandler.bind(this)}/>
              </div>
            </div>
          </div>
        <div>
          <div className={styles.player}>
            <div className={styles.sample}>
              <button>sample-name</button>
              <ul className="note-wrap">
                {
                  this.state.beat.kick.map((beat, index) => {
                    return (
                      <li
                        className={this.state.beat.kick[index] === 'x' ? `${styles.note} ${styles.active}` : styles.note}
                        onClick={this.onClickHandler.bind(this)}
                        data-active={this.state.beat.kick[index] === 'x' ? "active" : ""}
                        data-sample={`kick-${index}`}
                        ref={`kick-${index}`}>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className={styles.sample}>
              <button>sample-name</button>
              <ul className="note-wrap">
                {
                  this.state.beat.bass.map((beat, index) => {
                    return (
                      <li
                        className={this.state.beat.bass[index] === 'x' ? `${styles.note} ${styles.active}` : styles.note}
                        onClick={this.onClickHandler.bind(this)}
                        data-active={this.state.beat.bass[index] === 'x' ? "active" : ""}
                        data-sample={`bass-${index}`}
                        ref={`bass-${index}`}>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className={styles.sample}>
              <button>sample-name</button>
              <ul className="note-wrap">
                {
                  this.state.beat.oh.map((beat, index) => {
                    return (
                      <li
                        className={this.state.beat.oh[index] === 'x' ? `${styles.note} ${styles.active}` : styles.note}
                        onClick={this.onClickHandler.bind(this)}
                        data-active={this.state.beat.oh[index] === 'x' ? "active" : ""}
                        data-sample={`oh-${index}`}
                        ref={`oh-${index}`}>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className={styles.sample}>
              <button>sample-name</button>
              <ul className="note-wrap">
                {
                  this.state.beat.ch.map((beat, index) => {
                    return (
                      <li
                        className={this.state.beat.ch[index] === 'x' ? `${styles.note} ${styles.active}` : styles.note}
                        onClick={this.onClickHandler.bind(this)}
                        data-active={this.state.beat.ch[index] === 'x' ? "active" : ""}
                        data-sample={`ch-${index}`}
                        ref={`ch-${index}`}>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className={styles.sample}>
              <button>sample-name</button>
              <ul className="note-wrap">
                {
                  this.state.beat.snare.map((beat, index) => {
                    return (
                      <li
                        className={this.state.beat.snare[index] === 'x' ? `${styles.note} ${styles.active}` : styles.note}
                        onClick={this.onClickHandler.bind(this)}
                        data-active={this.state.beat.snare[index] === 'x' ? "active" : ""}
                        data-sample={`snare-${index}`}
                        ref={`snare-${index}`}>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
