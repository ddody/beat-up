import React, { Component, Fragment } from 'react';
import Tone from 'tone';
import { Route, Redirect } from 'react-router-dom';
import styles from '../styles/App.module.scss';
import StartAudioContext from 'startaudiocontext';
import NoteContainer from '../containers/NoteContainer';
import SoundListContainer from '../containers/SoundListContainer';


class App extends Component {
  constructor(props) {
    super(props);

    StartAudioContext(Tone.context);

    const playerSetting = {
      "volume": 0,
      "fadeOut": "64n",
    };

    let keys = new Tone.Players(this.props.soundList, playerSetting).toMaster();

    let loop = new Tone.Sequence((time, noteIdx, test) => {
      this.props.setNoteIndex(noteIdx);
      for (let i = 0; i < Object.keys(this.props.beat).length; i++) {
        if (Object.keys(this.props.soundList).indexOf(Object.keys(this.props.beat)[i]) > -1) {
          if (this.props.beat[Object.keys(this.props.beat)[i]][noteIdx] === 'x') {
            this.keys.get(Object.keys(this.props.beat)[i]).start(time, 0, "1n", 0);
          }
        }
      }
    }, this.props.initEvents, "16n");
    Tone.Transport.bpm.value = +this.props.bpm;
    this.loop = loop;
    loop.start();
    this.keys = keys;
  }

  componentDidMount() {
    this.props.onBeatLoad(
      this.props.history.location.pathname,
      this.props.soundList,
      this.keys,
      Tone.Transport.bpm
    );
  }

  onStop() {
    Tone.Transport.stop();
    this.props.onBeatState('stop');
    setTimeout(() => {
      this.props.onBeatInit();
    }, 100);
  }

  onPlay() {
    if (!this.props.isSoundUploadAndLoding) {
      Tone.Transport.start();
      this.props.onBeatState('play');
    }
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

  onClickEventCancel(ev) {
    if (ev.target.dataset.event !== 'selectBeat') {
      this.props.onBeatListShow(false);
    }
  }

  onBeatSave() {
    this.props.onBeatSave(this.props.beat, this.props.bpm);
  }

  onClipboardCopy(ev) {
    ev.target.focus();
    ev.target.setSelectionRange(0, ev.target.value.length);
    document.execCommand("copy");
  }

  render() {
    return (
      <Fragment>
        <Route path="/" exact render={(props) => {
          return (
            <Fragment>
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
                    <button onClick={this.onBeatSave.bind(this)}>Save</button>
                  </div>
                  <div>
                    <span>BPM: </span>
                    <strong>{this.props.bpm}</strong>
                    <div className="control-bar">
                      <input
                        type="range"
                        defaultValue={this.props.bpm}
                        min="60"
                        max="200"
                        onChange={this.onRangeHandler.bind(this)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <NoteContainer />
                </div>
                <div className={styles.beatListWrap}>
                  <div className={styles.listControl}>
                    <button onClick={this.props.addBeatLine.bind(this)}>Add line</button>
                    <button onClick={this.props.removeBeatLine.bind(this)}>Remove line</button>
                  </div>
                  <div className={styles.beatList} data-event="selectBeat">
                    <SoundListContainer keys={this.keys} />
                  </div>
                </div>
              </div>
              {
                this.props.saveUrlShow &&
                <div className={styles.popup}>
                  <input type="text" defaultValue={`${window.location.origin}/${this.props.saveUrl}`} readOnly onClick={this.onClipboardCopy.bind(this)} />
                  <button onClick={this.props.onBeatSaveShow.bind(this, false)}>Close</button>
                </div>
              }
            </Fragment>
          )
        }
        } />
        <Route path="/:id" exact render={(props) => {
          console.log(props);
          // this.props.onBeatLoad(props.match.params.id);
          return (
            <Fragment>
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
                    <button onClick={this.onBeatSave.bind(this)}>Save</button>
                  </div>
                  <div>
                    <span>BPM: </span>
                    <strong>{this.props.bpm}</strong>
                    <div className="control-bar">
                      <input
                        type="range"
                        defaultValue={this.props.bpm}
                        min="60"
                        max="200"
                        onChange={this.onRangeHandler.bind(this)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <NoteContainer />
                </div>
                <div className={styles.beatListWrap}>
                  <div className={styles.listControl}>
                    <button onClick={this.props.addBeatLine.bind(this)}>Add line</button>
                    <button onClick={this.props.removeBeatLine.bind(this)}>Remove line</button>
                  </div>
                  <div className={styles.beatList} data-event="selectBeat">
                    <SoundListContainer keys={this.keys} />
                  </div>
                </div>
              </div>
              {
                this.props.saveUrlShow &&
                <div className={styles.popup}>
                  <input type="text" defaultValue={`${window.location.origin}/${this.props.saveUrl}`} readOnly onClick={this.onClipboardCopy.bind(this)} />
                  <button onClick={this.props.onBeatSaveShow.bind(this, false)}>Close</button>
                </div>
              }

            </Fragment>
          )
        }
        } />
      </Fragment>
    );
  }
}

export default App;
