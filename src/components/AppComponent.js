import React, { Component } from 'react';
import styles from '../styles/App.module.scss';
import _ from 'lodash';
import Tone from 'tone';
import sounds from '../source/NoteSource';
import NoteContainer from '../containers/NoteContainer';
import StartAudioContext from 'startaudiocontext';

import firebase from '../services/firebase'

const storage = firebase.storage();

const storageRef = storage.ref();

console.log(storageRef);

class App extends Component {
  componentDidMount() {
    StartAudioContext(Tone.context);

    this.props.addBeatList(Object.keys(sounds));

    const playerSetting = {
      "volume": 0,
      "fadeOut": "64n",
    };

    const keys = new Tone.Players(sounds, playerSetting).toMaster();

    const loop = new Tone.Sequence((time, noteIdx) => {
      this.props.setNoteIndex(noteIdx);
      for (let i = 0; i < Object.keys(this.props.beat).length; i++) {
        if (Object.keys(sounds).indexOf(Object.keys(this.props.beat)[i]) > -1) {
          if (this.props.beat[Object.keys(this.props.beat)[i]][noteIdx] === 'x') {
            keys.get(Object.keys(this.props.beat)[i]).start(time, 0, "4n", 0);
          }
        }
      }
    }, this.props.initEvents, "16n");
    Tone.Transport.bpm.value = +this.props.bpm;
    this.keys = keys;
    this.loop = loop;
    loop.start();
  }

  initBeatMakeBySound(sounds) {
    let noteNames = [];
    let soundsCopy = { ...sounds };
    let soundsNames = Object.keys(sounds);

    for (let i = 0; i < soundsNames.length; i++) {
      noteNames.push(soundsNames[i]);
      soundsCopy[soundsNames[i]] = this.props.initBeat.slice();
    }

    this.props.onNoteChange(soundsCopy);
  }

  onStop() {
    Tone.Transport.stop();
    this.props.onBeatState('stop');
    setTimeout(() => {
      this.props.onBeatInit();
    }, 100);
  }

  onPlay() {
    Tone.Transport.start();
    this.props.onBeatState('play');
  }

  onPause() {
    Tone.Transport.pause();
    this.props.onBeatState('pause');
  }

  onRangeHandler(ev) {
    if (this.props.isPlay === 'play') {
      const rangePromise = new Promise((resolve, reject) => {
        Tone.Transport.pause();
        Tone.Transport.bpm.value = +ev.target.value;
        this.props.setBeatBpm(+ev.target.value);
        resolve();
      })
      rangePromise.then(() => {
        Tone.Transport.start();
      });
    } else {
      Tone.Transport.bpm.value = +ev.target.value;
      this.props.setBeatBpm(+ev.target.value);
    }
  }

  onTest() {
    const vanilla = {
      kick: ["x", "-", "-", "-", "x", "-", "-", "x", "-", "-", "x", "-", "-", "-", "x", "-", "x", "x", "x", "-", "x", "-", "-", "-", "x", "-", "-", "-", "-", "x", "-", "-"],
      bass: ["x", "-", "-", "-", "x", "-", "x", "-", "x", "-", "x", "x", "-", "-", "x", "-", "-", "x", "-", "-", "x", "-", "-", "-", "x", "-", "-", "-", "x", "-", "x", "-"],
      oh: ["x", "-", "-", "-", "x", "x", "-", "-", "-", "x", "x", "-", "x", "-", "x", "-", "-", "x", "-", "-", "x", "-", "-", "-", "x", "-", "-", "x", "-", "-", "-", "x"],
      ch: ["-", "x", "-", "x", "-", "x", "x", "x", "x", "x", "x", "-", "-", "x", "x", "-", "-", "x", "-", "-", "x", "-", "-", "-", "x", "-", "-", "x", "x", "x", "x", "x"],
      snare: ["-", "-", "x", "-", "-", "x", "-", "-", "-", "x", "x", "-", "-", "-", "x", "-", "x", "x", "x", "-", "x", "x", "x", "-", "x", "x", "x", "x", "-", "-", "-", "x"]
    };

    this.props.onNoteChange(vanilla);
  }

  onTest2() {
    const vanilla = {
      kick: ["x", "x", "x", "-", "x", "-", "-", "x", "-", "-", "-", "x", "-", "-", "-", "-", "x", "-", "-", "-", "-", "x", "-", "-", "x", "-", "x", "x", "x", "x", "-", "x"],
      bass: ["-", "-", "x", "-", "x", "x", "-", "x", "-", "-", "-", "x", "x", "-", "-", "x", "x", "x", "-", "-", "x", "x", "x", "-", "x", "-", "-", "x", "-", "x", "-", "x"],
      oh: ["-", "-", "x", "-", "x", "-", "-", "x", "x", "x", "-", "x", "-", "-", "-", "-", "x", "-", "-", "-", "-", "x", "-", "x", "x", "-", "x", "-", "x", "x", "x", "x"],
      ch: ["-", "-", "x", "x", "-", "-", "-", "-", "x", "x", "x", "-", "-", "-", "-", "x", "x", "x", "-", "-", "x", "-", "x", "-", "x", "-", "-", "-", "-", "x", "-", "x"],
      snare: ["-", "-", "x", "x", "-", "-", "-", "-", "-", "-", "x", "-", "-", "-", "-", "x", "x", "x", "-", "-", "-", "-", "x", "x", "x", "-", "-", "-", "-", "x", "-", "x"]
    };

    this.props.onNoteChange(vanilla);
  }

  addMoreBeat() {
    let addBeat = { ...this.props.beat };
    addBeat = Object.assign({}, addBeat, {
      [`noname${Object.keys(addBeat).length}`]: this.props.initBeat.slice()
    });
    this.props.onNoteChange(addBeat);
  }

  onClickEventCancel(ev) {
    if (ev.target.dataset.event !== 'selectBeat') {
      this.props.onBeatListShow(false);
    }
  }

  playTest(beat) {
    console.log(beat);
    this.keys.get(beat).start();
  }

  render() {
    return (
      <div className={styles.App} onClick={this.onClickEventCancel.bind(this)}>
        <header>
          <h1>title</h1>
        </header>
        <div className="status-bar">
          <div className="menu-wrap">
            <button id="start" onClick={this.onPlay.bind(this)}>Play</button>
            <button onClick={this.onPause.bind(this)}>pause</button>
            <button onClick={this.onStop.bind(this)}>Stop</button>
            <button onClick={this.onTest.bind(this)}>Test</button>
            <button onClick={this.onTest2.bind(this)}>Test2</button>
            <button>Reset</button>
            <button>Save</button>
          </div>
          <div>
            <span>BPM: </span>
            <strong>{this.props.bpm}</strong>
            <div className="control-bar">
              <input type="range" defaultValue={this.props.bpm} min="60" max="200" onChange={this.onRangeHandler.bind(this)} />
            </div>
          </div>
        </div>
        <div>
          <NoteContainer />
        </div>
        <div>
          <button onClick={this.addMoreBeat.bind(this)}>add more beat</button>
        </div>
        {this.props.isBeatListShow &&
          <div>
            <ul>
              {
                this.props.beatList.map((beat, index) => {
                  if (Object.keys(this.props.beat).indexOf(beat) < 0) {
                    return (
                      <li key={index}>
                        <button
                          onClick={this.props.onChangeBeatLine.bind(this, beat)}
                          data-event="selectBeat"
                        >{beat}</button>
                        <button onClick={this.playTest.bind(this, beat)} data-event="selectBeat">play</button>
                      </li>
                    )
                  }
                })
              }
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default App;
